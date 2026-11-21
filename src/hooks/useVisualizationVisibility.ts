import { useSiteDocument } from '@/hooks/useSiteContent';
import { useAuth } from '@/hooks/useAuth';
import { canViewVisualization } from '@/lib/site/model';

export function useVisualizationVisibility() {
  const site = useSiteDocument();
  const auth = useAuth();
  const enabled = site.data?.content.visualizationEnabled ?? false;
  const ready = !site.isPending && !auth.loading;
  return {
    visible: ready && !site.isError && canViewVisualization(enabled, auth.isAdmin),
    loading: !ready,
    error: site.isError,
    retry: site.refetch,
  };
}
