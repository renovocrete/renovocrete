import { useEffect } from "react";
import { PRO_PORTAL_URL } from "@/lib/site/model";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
const EspacePro = () => {
 const { t } = useLanguage();
 useEffect(() => { window.location.replace(PRO_PORTAL_URL); }, []);
 return <div className="min-h-screen bg-background flex items-center justify-center p-6"><Button asChild><a href={PRO_PORTAL_URL}>{t("Ouvrir l’espace professionnel", "Open professional workspace", "Abrir el espacio profesional")}</a></Button></div>;
};
export default EspacePro;
