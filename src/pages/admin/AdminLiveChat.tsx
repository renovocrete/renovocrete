import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, CheckCircle2, RefreshCw, User } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

type Conv = {
  id: string;
  session_id: string;
  status: "bot" | "human" | "closed";
  visitor_name: string | null;
  visitor_email: string | null;
  unread_admin: number;
  last_message_at: string;
  started_at: string;
};
type Msg = { id: string; role: "user" | "assistant" | "admin" | "system"; content: string; created_at: string };

export default function AdminLiveChat() {
  const [convs, setConvs] = useState<Conv[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [filter, setFilter] = useState<"all" | "human" | "bot" | "closed">("human");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const loadConvs = async () => {
    let q = supabase.from("chatbot_conversations")
      .select("id,session_id,status,visitor_name,visitor_email,unread_admin,last_message_at,started_at")
      .order("last_message_at", { ascending: false })
      .limit(100);
    if (filter !== "all") q = q.eq("status", filter);
    const { data } = await q;
    setConvs((data || []) as Conv[]);
  };
  const loadMsgs = async (id: string) => {
    const { data } = await supabase.from("chatbot_messages").select("*").eq("conversation_id", id).order("created_at");
    setMsgs((data || []) as Msg[]);
    await (supabase as any).from("chatbot_conversations").update({ unread_admin: 0 }).eq("id", id);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  useEffect(() => { loadConvs(); }, [filter]);
  useEffect(() => {
    const t = setInterval(() => { loadConvs(); if (activeId) loadMsgs(activeId); }, 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, filter]);
  useEffect(() => { if (activeId) loadMsgs(activeId); }, [activeId]);

  const active = convs.find((c) => c.id === activeId);

  const send = async () => {
    if (!text.trim() || !activeId) return;
    setSending(true);
    const { error } = await supabase.functions.invoke("chatbot-admin-send", { body: { conversation_id: activeId, content: text.trim() } });
    setSending(false);
    if (error) return toast.error("Envoi impossible");
    setText("");
    await loadMsgs(activeId);
    loadConvs();
  };
  const closeConv = async () => {
    if (!activeId) return;
    await supabase.functions.invoke("chatbot-admin-send", { body: { conversation_id: activeId, action: "close" } });
    toast.success("Conversation clôturée");
    loadConvs();
  };

  return (
    <div className="h-[calc(100vh-0px)] flex">
      <aside className="w-80 shrink-0 border-r bg-background flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold flex items-center gap-2"><MessageCircle className="w-4 h-4" />Live Chat</h2>
            <Button size="icon" variant="ghost" onClick={loadConvs}><RefreshCw className="w-4 h-4" /></Button>
          </div>
          <div className="flex gap-1 text-xs">
            {(["human", "bot", "closed", "all"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-2 py-1 rounded ${filter === f ? "bg-foreground text-background" : "bg-secondary"}`}>
                {f === "human" ? "En attente" : f === "bot" ? "Bot" : f === "closed" ? "Fermées" : "Toutes"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {convs.map((c) => (
            <button key={c.id} onClick={() => setActiveId(c.id)}
              className={`w-full text-left p-3 border-b hover:bg-secondary/50 ${activeId === c.id ? "bg-secondary" : ""}`}>
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-sm truncate">{c.visitor_name || c.visitor_email || `Session ${c.session_id.slice(0, 6)}`}</p>
                {c.unread_admin > 0 && <Badge variant="destructive" className="text-[10px]">{c.unread_admin}</Badge>}
              </div>
              <p className="text-xs text-muted-foreground truncate">{c.visitor_email || "—"}</p>
              <div className="flex items-center justify-between mt-1">
                <Badge variant="outline" className="text-[10px] capitalize">{c.status}</Badge>
                <span className="text-[10px] text-muted-foreground">{formatDistanceToNow(new Date(c.last_message_at), { locale: fr, addSuffix: true })}</span>
              </div>
            </button>
          ))}
          {convs.length === 0 && <p className="text-xs text-muted-foreground text-center py-8">Aucune conversation.</p>}
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-secondary/20">
        {!active ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
            Sélectionnez une conversation pour répondre au visiteur.
          </div>
        ) : (
          <>
            <header className="px-6 py-4 border-b bg-background flex items-center justify-between">
              <div>
                <p className="font-heading font-semibold flex items-center gap-2"><User className="w-4 h-4" />{active.visitor_name || "Visiteur"}</p>
                <p className="text-xs text-muted-foreground">{active.visitor_email || "email non fourni"} · session {active.session_id.slice(0, 8)}</p>
              </div>
              <div className="flex gap-2">
                <Badge className="capitalize">{active.status}</Badge>
                {active.status !== "closed" && (
                  <Button size="sm" variant="outline" onClick={closeConv}><CheckCircle2 className="w-4 h-4 mr-1" />Clôturer</Button>
                )}
              </div>
            </header>
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {msgs.map((m) => {
                const isVisitor = m.role === "user";
                const isAdmin = m.role === "admin";
                const isSystem = m.role === "system";
                if (isSystem) return <div key={m.id} className="text-center text-xs text-muted-foreground italic">{m.content}</div>;
                return (
                  <div key={m.id} className={`flex ${isVisitor ? "justify-start" : "justify-end"}`}>
                    <Card className={`max-w-[70%] p-3 text-sm ${isAdmin ? "bg-primary text-primary-foreground" : isVisitor ? "bg-background" : "bg-muted"}`}>
                      <p className="text-[10px] opacity-70 mb-1 uppercase tracking-wider">{isAdmin ? "Vous (RENOVO)" : isVisitor ? "Visiteur" : "Assistant IA"}</p>
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    </Card>
                  </div>
                );
              })}
              <div ref={endRef} />
            </div>
            <div className="p-4 border-t bg-background flex gap-2">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Votre réponse au visiteur…"
                rows={2}
                className="flex-1 resize-none"
                disabled={active.status === "closed"}
              />
              <Button onClick={send} disabled={sending || !text.trim() || active.status === "closed"}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
