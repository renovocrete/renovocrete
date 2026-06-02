import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Library } from "lucide-react";

const CATEGORIES = ["all", "photo", "video", "realisation", "inspiration", "case_study", "commercial"];

export default function PartnerMediaLibrary() {
  const [rows, setRows] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  useEffect(() => {
    (async () => {
      const { data } = await (supabase as any).from("partner_media_library").select("*").order("created_at", { ascending: false });
      setRows(data ?? []);
    })();
  }, []);

  const filtered = rows.filter((r) =>
    (cat === "all" || r.category === cat) &&
    (!q || r.title?.toLowerCase().includes(q.toLowerCase()) || r.description?.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Médiathèque Renovo Crete</h1>
        <p className="text-muted-foreground mt-1">Ressources officielles : photos, vidéos, études de cas, présentations.</p>
      </header>
      <div className="flex flex-wrap gap-3">
        <Input placeholder="Rechercher..." value={q} onChange={(e) => setQ(e.target.value)} className="max-w-sm" />
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="max-w-xs"><SelectValue /></SelectTrigger>
          <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c === "all" ? "Toutes catégories" : c}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      {filtered.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-muted-foreground flex flex-col items-center gap-2">
          <Library className="w-8 h-8 opacity-50" />
          Aucune ressource disponible pour le moment. Renovo Crete publie régulièrement de nouveaux contenus.
        </CardContent></Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <Card key={r.id} className="overflow-hidden">
              {r.thumbnail_url && <img src={r.thumbnail_url} alt={r.title} className="w-full aspect-video object-cover" />}
              <CardContent className="p-4 space-y-2">
                <div className="font-medium">{r.title}</div>
                {r.category && <Badge variant="secondary" className="text-xs">{r.category}</Badge>}
                <div className="text-sm text-muted-foreground line-clamp-2">{r.description}</div>
                {r.downloadable && (
                  <Button asChild size="sm" variant="outline" className="w-full">
                    <a href={r.url} target="_blank" rel="noreferrer"><Download className="w-3.5 h-3.5 mr-2" />Télécharger</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
