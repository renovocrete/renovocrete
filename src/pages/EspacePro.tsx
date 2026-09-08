import { useEffect } from "react";
import { ESPACE_PRO_PATH } from "@/lib/espacePro";

const EspacePro = () => {
  useEffect(() => {
    document.title = "Espace Pro | RENOVO CRETE";
  }, []);

  return (
    <div className="fixed inset-0 bg-background">
      <iframe
        src={ESPACE_PRO_PATH}
        title="Espace professionnel RENOVO CRETE"
        className="w-full h-full border-0"
        allow="camera; clipboard-write; downloads"
      />
    </div>
  );
};

export default EspacePro;
