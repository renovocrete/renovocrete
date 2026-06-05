import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

type KB = { id: string; title: string; content: string; tags: string[] | null; is_active: boolean };

export default function AdminChatbot() {
  const [items, setItems] = useState<KB[]>([]);
  const [draft, setDraft] = useState({ title: "", content: "", tags: "" });

  const load = async () => {
    const { data } = await (supabase as any).from("chatbot_knowledge").select("*").order("created_at", { ascending: false });
    setItems((data || []) as KB[]);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!draft.title || !draft.content) return;
    const { error } = await (supabase as any).from("chatbot_knowledge").insert({
      title: draft.title,
      content: draft.content,
      tags: draft.tags.split(",").map(t => t.trim()).filter(Boolean),
    });
    if (error) return toast.error(error.message);
    setDraft({ title: "", content: "", tags: "" });
    toast.success("Ajouté à la base");
    load();
  };
  const toggle = async (id: string, v: boolean) => {
    await (supabase as any).from("chatbot_knowledge").update({ is_active: v }).eq("id", id);
    load();
  };
  const remove = async (id: string) => {
    await (supabase as any).from("chatbot_knowledge").delete().eq("id", id);
    load();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-6">
        <h1 className="font-heading text-2xl font-bold">Assistant IA — base documentaire</h1>
        <p className="text-muted-foreground text-sm">Alimentez les connaissances du chatbot public.</p>
      </header>

      <Card className="p-6 mb-6 space-y-3">
        <Input placeholder="Titre (ex : Délais d'intervention)" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        <Textarea placeholder="Contenu de la réponse / information factuelle…" value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} rows={4} />
        <Input placeholder="Tags séparés par des virgules (ex: rdv, devis, prix)" value={draft.tags} onChange={(e) => setDraft({ ...draft, tags: e.target.value })} />
        <Button onClick={add}><Plus className="w-4 h-4 mr-2" />Ajouter</Button>
      </Card>

      <div className="space-y-3">
        {items.map((it) => (
          <Card key={it.id} className="p-4 flex items-start gap-4">
            <div className="flex-1">
              <p className="font-semibold">{it.title}</p>
              <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{it.content}</p>
              {it.tags && it.tags.length > 0 && (
                <div className="flex gap-1 mt-2 flex-wrap">
                  {it.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded bg-secondary">{t}</span>)}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={it.is_active} onCheckedChange={(v) => toggle(it.id, v)} />
              <Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </Card>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground text-center py-12">Aucune entrée pour le moment.</p>}
      </div>
    </div>
  );
}
