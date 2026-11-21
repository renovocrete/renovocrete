import { expect, it } from 'vitest';
import { authDestination, WEBSITE_ADMIN_PATH } from '@/lib/site/authDestination';
it('opens website editing for an administrator',()=>{expect(WEBSITE_ADMIN_PATH).toBe('/admin/site');expect(authDestination(true,null)).toBe('/admin/site');});
it('preserves administrator destination after sign-in',()=>{expect(authDestination(true,'/admin/dashboard')).toBe('/admin/site');});
it('never sends a denied administrator request to the Pro dashboard',()=>{expect(authDestination(false,'/admin/site')).toBe('/auth?redirect=%2Fadmin%2Fsite');});
it('does not accept external redirect destinations',()=>{expect(authDestination(false,'//evil.example')).toBe('/dashboard');});
it('keeps contractor dashboard access unchanged',()=>{expect(authDestination(false,null)).toBe('/dashboard');});
