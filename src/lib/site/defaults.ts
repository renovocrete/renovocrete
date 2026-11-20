import * as mock from '@/data/mock';
import services from '@/data/siteServices.json';
import { SiteContent, siteSchema } from './model';
export const defaultImages = {heroImg:mock.heroImg,countertopImg:mock.countertopImg,tableImg:mock.tableImg,industrialImg:mock.industrialImg,outdoorImg:mock.outdoorImg,commercialImg:mock.commercialImg,garageImg:mock.garageImg,beforeAfterImg:mock.beforeAfterImg};
export const defaultSite:SiteContent = siteSchema.parse({
 contact:{phone:'+590 690 53 58 34',email:'renovocrete@gmail.com',quoteEmail:'renovocretebat@gmail.com',base:'Saint-Martin',instagram:'https://www.instagram.com/renovocrete',tiktok:'https://www.tiktok.com/@renovocrete',facebook:'https://www.facebook.com/renovocrete'},
 zones:Object.values(mock.servedZones).map(z=>({...z,titleEs:z.titleEn})),
 images:defaultImages,
 services:services.map(s=>({...s,image:defaultImages[s.image as keyof typeof defaultImages]})),
 gallery:mock.galleryProjects.map((g,i)=>({...g,id:`gallery-${i}`,labelEs:g.labelEn,descEs:g.descEn})),copy:{}
});
