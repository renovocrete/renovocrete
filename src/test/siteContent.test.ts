import { describe, expect, it } from 'vitest';
import { PRO_PORTAL_URL, siteSchema, phoneHref } from '@/lib/site/model';
import { defaultSite } from '@/lib/site/defaults';
describe('Website content rules',()=>{
 it('sends professionals to the specified portal homepage',()=>{expect(PRO_PORTAL_URL).toBe('https://ecocretesystems.lovable.app/');});
 it('includes interior and exterior floor coating services',()=>{expect(defaultSite.services.find(s=>s.scope==='interior')?.title).toBe('Revêtements de sol intérieur');expect(defaultSite.services.find(s=>s.scope==='exterior')?.title).toBe('Revêtements de sol extérieur');});
 it('allows the administrator to add served areas',()=>{const site=structuredClone(defaultSite);site.zones[0].zones.push('Nouvelle ville');expect(siteSchema.parse(site).zones[0].zones).toContain('Nouvelle ville');});
 it('rejects executable social links',()=>{const site=structuredClone(defaultSite);site.contact.instagram='javascript:alert(1)';expect(siteSchema.safeParse(site).success).toBe(false);});
 it('rejects invalid email addresses',()=>{const site=structuredClone(defaultSite);site.contact.email='not-an-email';expect(siteSchema.safeParse(site).success).toBe(false);});
 it('formats editable international phone numbers safely',()=>{expect(phoneHref('+590 690 53 58 34')).toBe('tel:+590690535834');});
});
