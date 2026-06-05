import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Minus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_POS = "renovo_chatbot_pos";
const STORAGE_SESSION = "renovo_chatbot_session";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Bonjour 👋 Je suis l'assistant RENOVO CRETE. Comment puis-je vous aider ? Devis, services, événements, rendez-vous…" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_POS) || "null") || { x: 24, y: 24 }; } catch { return { x: 24, y: 24 }; }
  });
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sessionId = (() => {
    let s = localStorage.getItem(STORAGE_SESSION);
    if (!s) { s = crypto.randomUUID(); localStorage.setItem(STORAGE_SESSION, s); }
    return s;
  })();

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos({ x: Math.max(8, dragRef.current.origX - dx), y: Math.max(8, dragRef.current.origY - dy) });
  };
  const onPointerUp = () => {
    if (dragRef.current) localStorage.setItem(STORAGE_POS, JSON.stringify(pos));
    dragRef.current = null;
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
      const reply = (data as any)?.reply || "Désolé, je n'ai pas pu répondre.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e: any) {
      setMessages((m) => [...m, { role: "assistant", content: "Le service est momentanément indisponible. Contactez-nous via /contact." }]);
    } finally {
      setLoading(false);
    }
  };

  const style: React.CSSProperties = { right: pos.x, bottom: pos.y, position: "fixed", zIndex: 50 };

  if (!open) {
    return (
      <button
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={() => !dragRef.current && setOpen(true)}
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
            <p className="text-xs uppercase tracking-widest text-background/70">Assistant</p>
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
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-background border border-border"}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && <div className="text-xs text-muted-foreground italic">L'assistant rédige…</div>}
              <div ref={endRef} />
            </div>
            <div className="p-3 border-t flex gap-2 bg-background">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), send())}
                placeholder="Votre question…"
                className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button onClick={send} disabled={loading} className="h-10 px-3 rounded-md bg-foreground text-background hover:bg-primary transition disabled:opacity-50">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
