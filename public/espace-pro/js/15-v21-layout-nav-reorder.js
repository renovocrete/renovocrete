(function(){
'use strict';
const rc21Lang=(en,fr,es)=>{const l=typeof rc11Lang==='function'?rc11Lang():'en';return l==='fr'?fr:l==='es'?es:en};
const rc21Esc=(v='')=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function rc21AdminKey(){const p=typeof rc11AdminProfile==='function'?rc11AdminProfile():null,a=typeof currentAccount==='function'?currentAccount():null;return p?.id||a?.id||'admin-default'}
function rc21Settings(){
 store.settings=store.settings||{};store.settings.rc21=store.settings.rc21||{regionOrderByAdmin:{},territoryOrderByAdmin:{}};
 const s=store.settings.rc21;s.regionOrderByAdmin=s.regionOrderByAdmin||{};s.territoryOrderByAdmin=s.territoryOrderByAdmin||{};return s;
}
/* Stop the legacy V17 navigation builder from replacing the V19 fixed grouped navigation after special pages hydrate. */
if(typeof rc17HydrateNavigation==='function'&&!window.__rc21LegacyNavGuard){
 window.__rc21LegacyNavGuard=true;
 const legacy=rc17HydrateNavigation;
 rc17HydrateNavigation=function(){
   const nav=document.querySelector('.sidebar nav');
   if(nav?.classList.contains('rc19-nav-shell'))return;
   return legacy.apply(this,arguments);
 };
}
function rc21DecorateAdminDashboard(){
 const admin=typeof isAdmin==='function'&&isAdmin()&&currentView==='admin-dashboard';
 document.body.classList.toggle('rc21-admin-dashboard',!!admin);
 if(!admin)return;
 const content=document.getElementById('content');if(!content)return;
 const split=[...content.querySelectorAll('.rc11-grid-2')].find(x=>x.querySelector('.rc11-chart')&&x.querySelector('.rc11-order-queue'));
 if(!split)return;
 split.classList.add('rc21-dashboard-split');
 const panels=[...split.children];
 const orders=panels.find(x=>x.querySelector('.rc11-order-queue'));
 const chart=panels.find(x=>x.querySelector('.rc11-chart'));
 orders?.classList.add('rc21-dashboard-orders');chart?.classList.add('rc21-dashboard-chart');
}
function rc21OrderDom(container,selector,ids){
 if(!container||!ids?.length)return;
 const els=[...container.querySelectorAll(':scope > '+selector)],map=new Map(els.map(x=>[x.dataset.rc18Region||x.dataset.rc18Territory,x]));
 ids.forEach(id=>{const el=map.get(id);if(el)container.appendChild(el)});
 els.filter(el=>!ids.includes(el.dataset.rc18Region||el.dataset.rc18Territory)).forEach(el=>container.appendChild(el));
}
let rc21Drag=null;
function rc21SaveRegionOrder(grid){
 const s=rc21Settings(),key=rc21AdminKey();s.regionOrderByAdmin[key]=[...grid.querySelectorAll(':scope > [data-rc18-region]')].map(x=>x.dataset.rc18Region);saveStore();
}
function rc21SaveTerritoryOrder(card){
 const s=rc21Settings(),key=rc21AdminKey(),rid=card.dataset.rc18Region;s.territoryOrderByAdmin[key]=s.territoryOrderByAdmin[key]||{};
 s.territoryOrderByAdmin[key][rid]=[...card.querySelectorAll('.rc18-territory-list > [data-rc18-territory]')].map(x=>x.dataset.rc18Territory);saveStore();
}
function rc21BindRegionsReorder(){
 if(currentView!=='regions'||!(typeof isAdmin==='function'&&isAdmin()))return;
 const grid=document.getElementById('rc18RegionGrid');if(!grid)return;
 const s=rc21Settings(),key=rc21AdminKey(),rorder=s.regionOrderByAdmin[key]||[];
 rc21OrderDom(grid,'[data-rc18-region]',rorder);
 const toolbar=document.querySelector('.rc18-region-toolbar');
 if(toolbar&&!document.querySelector('.rc21-reorder-hint'))toolbar.insertAdjacentHTML('afterend',`<div class="rc21-reorder-hint"><b>⋮⋮</b> ${rc21Lang('Drag regions or territories to arrange your personal display order.','Glissez les régions ou territoires pour organiser votre ordre d’affichage personnel.','Arrastre regiones o territorios para organizar su orden de visualización personal.')}</div>`);
 [...grid.querySelectorAll(':scope > [data-rc18-region]')].forEach(card=>{
   const rid=card.dataset.rc18Region,list=card.querySelector('.rc18-territory-list'),torder=s.territoryOrderByAdmin[key]?.[rid]||[];
   rc21OrderDom(list,'[data-rc18-territory]',torder);
   if(!card.querySelector(':scope > header > .rc21-drag-handle')){
     const h=document.createElement('button');h.type='button';h.className='rc21-drag-handle';h.draggable=true;h.title=rc21Lang('Drag region','Déplacer la région','Mover región');h.textContent='⋮⋮';card.querySelector(':scope > header')?.prepend(h);
     h.addEventListener('dragstart',e=>{rc21Drag={type:'region',el:card};card.classList.add('rc21-dragging');e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',rid)});
     h.addEventListener('dragend',()=>{card.classList.remove('rc21-dragging');document.querySelectorAll('.rc21-drag-over').forEach(x=>x.classList.remove('rc21-drag-over'));rc21SaveRegionOrder(grid);rc21Drag=null});
   }
   card.addEventListener('dragover',e=>{if(rc21Drag?.type!=='region'||rc21Drag.el===card)return;e.preventDefault();card.classList.add('rc21-drag-over');const r=card.getBoundingClientRect(),before=e.clientY<r.top+r.height/2;grid.insertBefore(rc21Drag.el,before?card:card.nextSibling)});
   card.addEventListener('dragleave',()=>card.classList.remove('rc21-drag-over'));
   card.addEventListener('drop',e=>{if(rc21Drag?.type==='region'){e.preventDefault();card.classList.remove('rc21-drag-over');rc21SaveRegionOrder(grid)}});
   [...list?.querySelectorAll(':scope > [data-rc18-territory]')||[]].forEach(row=>{
     row.classList.add('rc21-draggable');const tid=row.dataset.rc18Territory;
     if(!row.querySelector(':scope > .rc21-drag-handle')){
       const h=document.createElement('button');h.type='button';h.className='rc21-drag-handle';h.draggable=true;h.title=rc21Lang('Drag territory','Déplacer le territoire','Mover territorio');h.textContent='⋮⋮';row.prepend(h);
       h.addEventListener('dragstart',e=>{rc21Drag={type:'territory',el:row,card};row.classList.add('rc21-dragging');e.stopPropagation();e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',tid)});
       h.addEventListener('dragend',()=>{row.classList.remove('rc21-dragging');document.querySelectorAll('.rc21-drag-over').forEach(x=>x.classList.remove('rc21-drag-over'));rc21SaveTerritoryOrder(card);rc21Drag=null});
     }
     row.addEventListener('dragover',e=>{if(rc21Drag?.type!=='territory'||rc21Drag.card!==card||rc21Drag.el===row)return;e.preventDefault();e.stopPropagation();row.classList.add('rc21-drag-over');const r=row.getBoundingClientRect(),before=e.clientY<r.top+r.height/2;list.insertBefore(rc21Drag.el,before?row:row.nextSibling)});
     row.addEventListener('dragleave',()=>row.classList.remove('rc21-drag-over'));
     row.addEventListener('drop',e=>{if(rc21Drag?.type==='territory'&&rc21Drag.card===card){e.preventDefault();e.stopPropagation();row.classList.remove('rc21-drag-over');rc21SaveTerritoryOrder(card)}});
   });
 });
}
function rc21DecorateProfileScope(){
 const menu=document.getElementById('rc19ProfileMenu');if(!menu||menu.querySelector('.rc21-scope-section')||!(typeof isAdmin==='function'&&isAdmin()))return;
 const p=typeof rc11AdminProfile==='function'?rc11AdminProfile():null,s=typeof rc12Settings==='function'?rc12Settings():null;if(!p||!s)return;
 const world=typeof rc12IsWorldHq==='function'&&rc12IsWorldHq(p),car=typeof rc12IsCaribbeanHq==='function'&&rc12IsCaribbeanHq(p);
 const region=car?'CARIBBEAN':s.scopeRegion;
 const sec=document.createElement('div');sec.className='rc21-scope-section';
 let regionField='';
 if(world)regionField=`<div class="rc21-scope-field"><label>${rc21Lang('Region','Région','Región')}</label><select id="rc21ProfileRegion">${rc12RegionOptions(s.scopeRegion,true,p)}</select></div>`;
 else regionField=`<div class="rc21-scope-field"><label>${rc21Lang('Region','Région','Región')}</label><div class="rc21-readonly">${rc21Lang(car?'Caribbean':rc11RegionName(p.regionId),car?'Caraïbes':rc11RegionName(p.regionId),car?'Caribe':rc11RegionName(p.regionId))}</div></div>`;
 let territoryField='';
 if(world||car)territoryField=`<div class="rc21-scope-field"><label>${rc21Lang('Territory','Territoire','Territorio')}</label><select id="rc21ProfileTerritory">${region==='ALL'?`<option value="ALL">${rc21Lang('All territories','Tous les territoires','Todos los territorios')}</option>`:rc12TerritoryOptions(region,s.scopeTerritory,true,p)}</select></div>`;
 else territoryField=`<div class="rc21-scope-field"><label>${rc21Lang('Territory','Territoire','Territorio')}</label><div class="rc21-readonly">${rc21Esc(rc11Territory(p.territoryId)?.name||'')}</div></div>`;
 sec.innerHTML=`<div class="rc21-scope-title">${rc21Lang('Workspace scope','Périmètre de travail','Ámbito de trabajo')}</div><div class="rc21-scope-grid">${regionField}${territoryField}</div>`;
 menu.querySelector('.rc19-profile-head')?.after(sec);
 const rr=sec.querySelector('#rc21ProfileRegion'),tt=sec.querySelector('#rc21ProfileTerritory');
 rr?.addEventListener('change',e=>{s.scopeRegion=e.target.value;s.scopeTerritory='ALL';saveStore();renderShell()});
 tt?.addEventListener('change',e=>{s.scopeTerritory=e.target.value;saveStore();renderShell()});
}
function rc21EnsureStableNav(){
 if(!(typeof isAdmin==='function'&&isAdmin()))return;
 if(!['admin-dashboard','approvals','clients','portfolio','loyalty','referrals','admin-users','platform-access','admin-calculator','admin-simulations','admin-simulations-v13','global-orders','invoices','receivables','admin-catalog','system-library','admin-documentation','admin-events','community','admin-messages','omnichannel','admin-support','broadcast-center','regions','territory-detail','admin-import','admin-audit','brand-studio','admin-settings','faq','elia-history'].includes(currentView))return;
 const nav=document.querySelector('.sidebar nav');
 /* V19 is the authoritative menu. If a late legacy hydration changed it, rebuild the shell once. */
 if(nav&&!nav.classList.contains('rc19-nav-shell')&&!window.__rc21NavRepairing){window.__rc21NavRepairing=true;setTimeout(()=>{renderShell();setTimeout(()=>window.__rc21NavRepairing=false,120)},0)}
}
function rc21Hydrate(){
 try{rc21DecorateAdminDashboard();rc21BindRegionsReorder();rc21EnsureStableNav();rc21DecorateProfileScope()}catch(e){console.warn('V21 targeted hydrate',e)}
}
/* Profile menu is created dynamically by the V19 shell. */
if(!window.__rc21ProfileObserver){window.__rc21ProfileObserver=true;new MutationObserver(()=>rc21DecorateProfileScope()).observe(document.body,{childList:true,subtree:false})}
const rc21ShellBase=renderShell;renderShell=function(){const out=rc21ShellBase();setTimeout(rc21Hydrate,115);setTimeout(rc21Hydrate,260);return out};
setTimeout(rc21Hydrate,180);
document.title='RENOVO CRETE — V21 Layout & Navigation Reliability';
})();
