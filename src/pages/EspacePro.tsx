import { useEffect } from "react";

const EspacePro = () => {
  useEffect(() => {
    document.title = "Espace Pro | RENOVO CRETE";
  }, []);

  return (
    <div className="fixed inset-0 bg-background">
      <iframe
        src="/espace-pro/index.html"
        title="Espace professionnel RENOVO CRETE"
        className="w-full h-full border-0"
        allow="camera; clipboard-write; downloads"
      />
    </div>
  );
};

export default EspacePro;
