import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ESPACE_PRO_DEMO_URL, ESPACE_PRO_URL } from "@/lib/espacePro";

/**
 * Full-screen host for the standalone professional portal (public/espace-pro/).
 * `/dashboard-preview` opens it with the demo accounts visible; other routes let
 * the portal's own configuration decide.
 */
const EspacePro = () => {
  const { pathname } = useLocation();
  const [loaded, setLoaded] = useState(false);
  const src = pathname === "/dashboard-preview" ? ESPACE_PRO_DEMO_URL : ESPACE_PRO_URL;

  useEffect(() => {
    document.title = "Espace Pro | RENOVO CRETE";
  }, []);

  return (
    <div className="fixed inset-0 bg-background">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground" aria-live="polite">
          Chargement de l’espace professionnel…
        </div>
      )}
      <iframe
        src={src}
        title="Espace professionnel RENOVO CRETE"
        className={`w-full h-full border-0 transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}
        allow="camera; clipboard-write; web-share"
        onLoad={() => setLoaded(true)}
      />
      <noscript>
        <a href={src}>Ouvrir l’espace professionnel</a>
      </noscript>
    </div>
  );
};

export default EspacePro;
