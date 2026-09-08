(function(){
'use strict';
function ensureProjectNav(){const nav=document.querySelector('.sidebar nav');if(!nav)return;const admin=typeof isAdmin==='function'&&isAdmin()&&!currentClient();const view=admin?'admin-projects':'projects';if(nav.querySelector(`button[data-view="${view}"]`))return;const group=nav.querySelector(`.rc19-nav-group[data-rc19-group="${admin?'sales':'work'}"] .rc19-group-items`);if(!group)return;const b=document.createElement('button');b.type='button';b.dataset.view=view;b.innerHTML=`<span aria-hidden="true">▣</span><span class="label">${admin?'Project tracking':'Projects'}</span>`;if(admin){const after=group.querySelector('button[data-view="admin-calculator"]');after?.after(b)||group.appendChild(b)}else{const after=group.querySelector('button[data-view="calculator"]');after?.after(b)||group.appendChild(b)} }
function allowedRegions(){const p=typeof rc11AdminProfile==='function'?rc11AdminProfile():null;if(!p)return[];if(p.level==='global_hq')return (typeof RC11_REGION_SEED!=='undefined'?RC11_REGION_SEED:[]).map(r=>r.id);if(p.level==='caribbean_hq')return['CARIBBEAN'];return[]}
function fixSettings(){if(currentView!=='admin-settings')return;const sec=document.getElementById('rc28NavSettings');if(sec)return;const regions=allowedRegions();if(!regions.length)return;try{window.rc28Hydrate?.()}catch(e){} }
const oldHydrate=window.rc28Hydrate;window.rc28Hydrate=function(){const out=oldHydrate?.apply(this,arguments);ensureProjectNav();fixSettings();return out};
const oldShell=window.renderShell;window.renderShell=function(){const out=oldShell.apply(this,arguments);setTimeout(()=>{ensureProjectNav();window.rc28Hydrate?.()},210);return out};
setTimeout(()=>{ensureProjectNav();fixSettings()},450);
})();
