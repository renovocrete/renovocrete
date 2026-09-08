(function(){
'use strict';
function applyProfessionalGroupLabels(){try{const c=currentClient?.();if(!c)return;const cfg=store.settings?.rc28?.professionalNavLabels?.[`REGION:${c.regionId}`];if(!cfg)return;document.querySelectorAll('.rc19-nav-group').forEach(g=>{const label=cfg.groups?.[g.dataset.rc19Group];if(!label)return;const head=g.querySelector('.rc19-group-head');if(!head)return;const spans=head.querySelectorAll(':scope > span');if(spans.length>=2)spans[1].textContent=label;const chev=head.querySelector('.rc19-chevron');if(chev&&!/[⌄⌃›‹]/.test(chev.textContent||''))chev.textContent='⌄'})}catch(e){}}
let t=0;const run=()=>{clearTimeout(t);t=setTimeout(applyProfessionalGroupLabels,35)};const mo=new MutationObserver(run);setTimeout(()=>{mo.observe(document.body,{childList:true,subtree:true});applyProfessionalGroupLabels()},450);const old=window.rc28Hydrate;window.rc28Hydrate=function(){const out=old?.apply(this,arguments);applyProfessionalGroupLabels();return out};
})();
