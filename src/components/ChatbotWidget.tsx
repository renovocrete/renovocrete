import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Minus, Headset } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "user" | "assistant" | "admin" | "system"; content: string; id?: string; created_at?: string };

const STORAGE_POS = "renovo_chatbot_pos";
const STORAGE_SESSION = "renovo_chatbot_session";
const STORAGE_CONTACT = "renovo_chatbot_contact";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Bonjour 👋 Je suis l'assistant RENOVO CRETE. Comment puis-je vous aider ? Devis, services, événements, rendez-vous… Vous pouvez aussi demander à parler à un conseiller." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"bot" | "human" | "closed">("bot");
  const [showHandoff, setShowHandoff] = useState(false);
  const [contact, setContact] = useState<{ name: string; email: string }>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_CONTACT) || "null") || { name: "", email: "" }; } catch { return { name: "", email: "" }; }
  });
  const [pos, setPos] = useState<{ x: number; y: number }>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_POS) || "null") || { x: 24, y: 24 }; } catch { return { x: 24, y: 24 }; }
  });
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number; moved: boolean } | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const lastFetchedAt = useRef<string | null>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sessionId = (() => {
    let s = localStorage.getItem(STORAGE_SESSION);
    if (!s) { s = crypto.randomUUID(); localStorage.setItem(STORAGE_SESSION, s); }
    return s;
  })();

  // Poll for admin messages every 5s while open
  useEffect(() => {
    if (!open) return;
    const poll = async () => {
      const { data } = await supabase.functions.invoke("chatbot-poll", { body: { session_id: sessionId, since: lastFetchedAt.current } });
      const d = data as any;
      if (!d) return;
      if (d.status) setStatus(d.status);
      if (Array.isArray(d.messages) && d.messages.length > 0) {
        const newOnes = d.messages.filter((m: Msg) => m.role === "admin" || m.role === "system");
        if (newOnes.length > 0) {
          setMessages((m) => [...m, ...newOnes]);
        }
        lastFetchedAt.current = d.messages[d.messages.length - 1].created_at;
      }
    };
    poll();
    const t = setInterval(poll, 5000);
    return () => clearInterval(t);
  }, [open, sessionId]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) dragRef.current.moved = true;
    setPos({ x: Math.max(8, dragRef.current.origX - dx), y: Math.max(8, dragRef.current.origY - dy) });
  };
  const onPointerUp = () => {
    if (dragRef.current) localStorage.setItem(STORAGE_POS, JSON.stringify(pos));
    setTimeout(() => { dragRef.current = null; }, 0);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("chatbot-reply", { body: { session_id: sessionId, messages: [...messages, { role: "user", content: text }] } });
      if (error) throw error;
      const reply = (data as any)?.reply;
      const human = (data as any)?.human;
      if (human) {
        setStatus("human");
        setMessages((m) => [...m, { role: "system", content: "Un conseiller a été notifié. Vous recevrez sa réponse ici sous peu." }]);
      } else if (reply) {
        setMessages((m) => [...m, { role: "assistant", content: reply }]);
      }
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Le service est momentanément indisponible. Contactez-nous via /contact." }]);
    } finally {
      setLoading(false);
    }
  };

  const submitHandoff = async () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email)) return;
    localStorage.setItem(STORAGE_CONTACT, JSON.stringify(contact));
    setShowHandoff(false);
    setLoading(true);
    const { error } = await supabase.functions.invoke("chatbot-handoff", {
      body: { session_id: sessionId, name: contact.name, email: contact.email, message: messages.slice(-1)[0]?.content },
    });
    setLoading(false);
    if (error) return;
    setStatus("human");
    setMessages((m) => [...m, { role: "system", content: `Merci ${contact.name || ""}, un conseiller RENOVO CRETE va vous répondre ici dès que possible. Gardez cette fenêtre ouverte.` }]);
  };

  const style: React.CSSProperties = { right: pos.x, bottom: pos.y, position: "fixed", zIndex: 50 };

  if (!open) {
    return (
      <button
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={() => !dragRef.current?.moved && setOpen(true)}
        style={style}
        aria-label="Ouvrir l'assistant RENOVO CRETE"
        className="w-14 h-14 rounded-full bg-foreground text-background shadow-2xl hover:bg-primary transition-colors flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full ring-2 ring-primary/30 animate-pulse pointer-events-none" />
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        style={style}
        className="w-[min(380px,calc(100vw-2rem))] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="bg-foreground text-background px-4 py-3 flex items-center justify-between cursor-move select-none"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-background/70">{status === "human" ? "Conseiller en ligne" : "Assistant"}</p>
            <p className="font-heading text-sm font-bold">RENOVO CRETE</p>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setMinimized(!minimized)} className="p-1.5 hover:bg-background/10 rounded"><Minus className="w-4 h-4" /></button>
            <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-background/10 rounded"><X className="w-4 h-4" /></button>
          </div>
        </div>

        {!minimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[420px] bg-secondary/30">
              {messages.map((m, i) => {
                if (m.role === "system") return <div key={i} className="text-center text-xs text-muted-foreground italic px-2">{m.content}</div>;
                const isUser = m.role === "user";
                const isAdmin = m.role === "admin";
                return (
                  <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap ${isUser ? "bg-primary text-primary-foreground" : isAdmin ? "bg-foreground text-background" : "bg-background border border-border"}`}>
                      {isAdmin && <p className="text-[10px] opacity-70 mb-1 uppercase tracking-wider">Conseiller RENOVO</p>}
                      {m.content}
                    </div>
                  </div>
                );
              })}
              {loading && <div className="text-xs text-muted-foreground italic">{status === "human" ? "Envoi en cours…" : "L'assistant rédige…"}</div>}
              <div ref={endRef} />
            </div>

            {showHandoff ? (
              <div className="p-3 border-t bg-background space-y-2">
                <p className="text-xs font-semibold">Parler à un conseiller</p>
                <input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Votre nom" className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm" />
                <input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="Votre email *" type="email" className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm" />
                <div className="flex gap-2">
                  <button onClick={() => setShowHandoff(false)} className="flex-1 h-9 rounded-md border text-sm">Annuler</button>
                  <button onClick={submitHandoff} disabled={loading} className="flex-1 h-9 rounded-md bg-foreground text-background text-sm disabled:opacity-50">Envoyer</button>
                </div>
              </div>
            ) : (
              <>
                {status !== "human" && (
                  <button onClick={() => setShowHandoff(true)} className="w-full py-2 text-xs bg-secondary hover:bg-secondary/70 border-t flex items-center justify-center gap-2 text-muted-foreground">
                    <Headset className="w-3.5 h-3.5" />Parler à un conseiller RENOVO
                  </button>
                )}
                <div className="p-3 border-t flex gap-2 bg-background">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), send())}
                    placeholder={status === "human" ? "Écrire au conseiller…" : "Votre question…"}
                    className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button onClick={send} disabled={loading} className="h-10 px-3 rounded-md bg-foreground text-background hover:bg-primary transition disabled:opacity-50">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
