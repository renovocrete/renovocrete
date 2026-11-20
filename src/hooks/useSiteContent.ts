import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { defaultSite } from '@/lib/site/defaults';
import { SiteContent, siteSchema } from '@/lib/site/model';
export const siteQueryKey=['website-content'];
export async function loadSiteContent(){
 const {data,error}=await supabase.from('site_content').select('content,updated_at').eq('key','website').maybeSingle();
 if(error)throw error;
 return {content:data?siteSchema.parse(data.content):defaultSite,updatedAt:data?.updated_at??null};
}
export function useSiteDocument(){return useQuery({queryKey:siteQueryKey,queryFn:loadSiteContent,staleTime:30000,refetchOnWindowFocus:true});}
export function useSiteContent(){
 const doc=useSiteDocument();
 const raw=doc.data?.content??defaultSite;
 const urls=useQuery({queryKey:['website-images',raw.images,raw.gallery,raw.services],queryFn:async()=>{
 const paths=[...new Set([...Object.values(raw.images),...raw.gallery.map(g=>g.src),...raw.services.map(s=>s.image)].filter(p=>p.startsWith('site-media:')).map(p=>p.slice(11)))];
 if(!paths.length)return {} as Record<string,string>;
 const {data,error}=await supabase.storage.from('site-media').createSignedUrls(paths,3600);
 if(error)throw error;
 const result:Record<string,string>={};for(const item of data??[]){if(item.path&&item.signedUrl)result[`site-media:${item.path}`]=item.signedUrl;}return result;
 },staleTime:2400000,refetchInterval:2400000});
 const resolve=(src:string)=>src.startsWith('site-media:')?(urls.data?.[src]??''):src;
 const content:SiteContent={...raw,images:Object.fromEntries(Object.entries(raw.images).map(([key,src])=>[key,resolve(src)])),gallery:raw.gallery.map(g=>({...g,src:resolve(g.src)})),services:raw.services.map(s=>({...s,image:resolve(s.image)}))};
 return {...doc,content,resolve};
}
