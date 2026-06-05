import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

type Conv = { id: string; subject: string | null; last_message_at: string };
type Msg = { id: string; sender_id: string; body: string; created_at: string };

export default function AdminMessaging() {
  const { user } = useAuth();
  const [convs, setConvs] = useState<Conv[]>([]);
  const [active, setActive] = useState<Conv | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const loadConvs = async () => {
    const { data } = await (supabase as any).from("conversations").select("id,subject,last_message_at").order("last_message_at", { ascending: false });
    setConvs((data || []) as Conv[]);
  };
  const loadMsgs = async (id: string) => {
    const { data } = await (supabase as any).from("messages").select("id,sender_id,body,created_at").eq("conversation_id", id).order("created_at");
    setMsgs((data || []) as Msg[]);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  useEffect(() => { loadConvs(); }, []);
  useEffect(() => {
    if (!active) return;
    loadMsgs(active.id);
    const ch = supabase.channel(`msg-${active.id}`).on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${active.id}` }, () => loadMsgs(active.id)).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [active?.id]);

  const send = async () => {
    if (!active || !text.trim() || !user) return;
    const body = text.trim();
    setText("");
    const { error } = await (supabase as any).from("messages").insert({ conversation_id: active.id, sender_id: user.id, body });
    if (error) toast.error(error.message);
    await (supabase as any).from("conversations").update({ last_message_at: new Date().toISOString() }).eq("id", active.id);
  };

  const create = async () => {
    if (!user || !recipientEmail) return;
    // find user_id by email through partner_profiles or contractor_profiles
    const [{ data: p }, { data: c }] = await Promise.all([
      (supabase as any).from("partner_profiles").select("user_id").eq("email", recipientEmail).maybeSingle(),
      supabase.from("contractor_profiles").select("user_id").eq("email", recipientEmail).maybeSingle(),
    ]);
    const targetId = (p as any)?.user_id || (c as any)?.user_id;
    if (!targetId) return toast.error("Destinataire introuvable");
    const { data: conv, error } = await (supabase as any).from("conversations").insert({ subject: subject || "Sans objet", created_by: user.id }).select().single();
    if (error || !conv) return toast.error(error?.message || "Erreur");
    await (supabase as any).from("conversation_participants").insert([
      { conversation_id: conv.id, user_id: user.id, role: "admin" },
      { conversation_id: conv.id, user_id: targetId, role: "member" },
    ]);
    setRecipientEmail("");
    setSubject("");
    loadConvs();
    setActive(conv);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-2rem)]">
      <header className="mb-6">
        <h1 className="font-heading text-2xl font-bold">Centre de messagerie</h1>
        <p className="text-muted-foreground text-sm">Toutes vos conversations avec sous-traitants et partenaires.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[75vh]">
        <Card className="overflow-hidden flex flex-col">
          <div className="p-3 border-b space-y-2">
            <Input placeholder="Email destinataire…" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} />
            <Input placeholder="Sujet…" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <Button onClick={create} className="w-full" size="sm"><Plus className="w-4 h-4 mr-1" />Nouvelle conversation</Button>
          </div>
          <div className="flex-1 overflow-y-auto divide-y">
            {convs.map((c) => (
              <button key={c.id} onClick={() => setActive(c)} className={`w-full text-left p-3 hover:bg-secondary ${active?.id === c.id ? "bg-secondary" : ""}`}>
                <p className="font-medium text-sm truncate">{c.subject || "Sans objet"}</p>
                <p className="text-xs text-muted-foreground">{new Date(c.last_message_at).toLocaleString("fr-FR")}</p>
              </button>
            ))}
            {convs.length === 0 && <p className="p-6 text-sm text-muted-foreground text-center">Aucune conversation.</p>}
          </div>
        </Card>

        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          {!active ? (
            <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">Sélectionnez une conversation.</div>
          ) : (
            <>
              <div className="p-4 border-b">
                <p className="font-semibold">{active.subject || "Sans objet"}</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/30">
                {msgs.map((m) => {
                  const mine = m.sender_id === user?.id;
                  return (
                    <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${mine ? "bg-primary text-primary-foreground" : "bg-background border border-border"}`}>
                        <p className="whitespace-pre-wrap">{m.body}</p>
                        <p className={`text-[10px] mt-1 ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{new Date(m.created_at).toLocaleTimeString("fr-FR")}</p>
                      </div>
                    </div>
                  );
                })}
                <div ref={endRef} />
              </div>
              <div className="p-3 border-t flex gap-2">
                <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Votre message…" onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())} />
                <Button onClick={send}><Send className="w-4 h-4" /></Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
