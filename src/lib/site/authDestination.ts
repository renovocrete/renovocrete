export const WEBSITE_ADMIN_PATH = '/admin/site';

export function authDestination(isAdmin: boolean, requested: string | null): string {
  if (requested?.startsWith('/admin') && (requested === '/admin' || requested.startsWith('/admin/'))) {
    return isAdmin ? WEBSITE_ADMIN_PATH : '/auth?redirect=%2Fadmin%2Fsite';
  }
  if (isAdmin) return WEBSITE_ADMIN_PATH;
  if (requested?.startsWith('/') && !requested.startsWith('//') && !requested.startsWith('/auth') && !requested.includes('\\')) return requested;
  return '/dashboard';
}
