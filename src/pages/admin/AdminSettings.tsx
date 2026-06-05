import { Card } from "@/components/ui/card";

export default function AdminSettings() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="font-heading text-2xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground text-sm">Préférences globales de la plateforme.</p>
      </header>
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">Options avancées à venir : seuils de notifications, modèles d'emails, intégrations IA externes (ChatGPT, Claude, Gemini).</p>
      </Card>
    </div>
  );
}
