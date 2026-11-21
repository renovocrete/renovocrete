import { z } from 'zod';
export const PRO_PORTAL_URL = 'https://ecocretesystems.lovable.app/';
const text = z.string().max(6000);
const image = z.string().max(2048).refine(v => v.startsWith('/assets/') || v.startsWith('/src/assets/') || v.startsWith('site-media:') || /^https:\/\//.test(v), 'Image non valide');
const url = z.string().url().max(2048).refine(v => v.startsWith('https://'), 'Utilisez un lien https');
const service = z.object({id:text,title:text.min(1),titleEn:text.min(1),titleEs:text,desc:text,descEn:text,descEs:text,image,features:z.array(text).max(30),featuresEn:z.array(text).max(30),featuresEs:z.array(text).max(30),scope:z.enum(['interior','exterior','both'])});
export const siteSchema = z.object({
 visualizationEnabled: z.boolean().default(true),
 contact:z.object({phone:text.min(3),email:z.string().email().max(255),quoteEmail:z.string().email().max(255),base:text.min(1),instagram:url,tiktok:url,facebook:url}),
 zones:z.array(z.object({title:text.min(1),titleEn:text.min(1),titleEs:text,zones:z.array(text.min(1)).max(100)})).max(30),
 images:z.record(image),services:z.array(service).max(100),
 gallery:z.array(z.object({id:text,src:image,alt:text.min(1),label:text.min(1),labelEn:text.min(1),labelEs:text,category:z.enum(['Sols','Comptoirs','Tables','Industriel','Extérieur']),desc:text,descEn:text,descEs:text})).max(300),
 copy:z.record(z.object({fr:text.optional(),en:text.optional(),es:text.optional()}))
});
export type SiteContent = z.infer<typeof siteSchema>;
export type SiteService = SiteContent['services'][number];
export const phoneHref = (phone:string) => `tel:${phone.replace(/[^+\d]/g,'')}`;
export function translateContent(item:{[key:string]:unknown},field:string,lang:string):string {
 const key=lang==='fr'?field:lang==='es'?`${field}Es`:`${field}En`;
 return String(item[key] || item[`${field}En`] || item[field] || '');
}

export function canViewVisualization(enabled: boolean, isAdmin: boolean): boolean {
 return enabled || isAdmin;
}
