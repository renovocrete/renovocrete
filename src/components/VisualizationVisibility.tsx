import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useVisualizationVisibility } from '@/hooks/useVisualizationVisibility';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

export function VisualizationVisible({ children }: { children: ReactNode }) {
  const { visible } = useVisualizationVisibility();
  return visible ? <>{children}</> : null;
}

export function VisualizationRoute({ children }: { children: ReactNode }) {
  const { visible, loading, error, retry } = useVisualizationVisibility();
  const { t } = useLanguage();
  if (loading) return <div className="min-h-[60vh] flex items-center justify-center pt-20"><Loader2 className="w-6 h-6 animate-spin text-primary" aria-label={t('Chargement', 'Loading', 'Cargando')} /></div>;
  if (error) return <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 pt-20"><p>{t('Impossible de vérifier la disponibilité.', 'Unable to check availability.', 'No se pudo comprobar la disponibilidad.')}</p><Button onClick={() => void retry()}>{t('Réessayer', 'Retry', 'Reintentar')}</Button></div>;
  if (!visible) return <Navigate to="/" replace />;
  return <>{children}</>;
}
