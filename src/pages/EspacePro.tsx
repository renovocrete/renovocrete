import { useEffect } from "react";
import { ESPACE_PRO_HREF } from "@/lib/espacePro";

const EspacePro = () => {
  useEffect(() => {
    window.location.replace(ESPACE_PRO_HREF);
  }, []);

  return (
    <div className="fixed inset-0 grid place-items-center bg-background text-muted-foreground">
      <p>Ouverture de l’espace professionnel…</p>
    </div>
  );
};

export default EspacePro;
