(function(){
  function rc15FeatureForView(view,isAdminView){
    const map=isAdminView?{
      'admin-simulator':'calculator','admin-simulations':'calculator','global-orders':'orders','invoices':'invoices',
      'admin-documentation':'documentation','admin-events':'events','community':'community'
    }:{
      'calculator':'calculator','simulations':'calculator','cart':'orders','orders':'orders','invoices':'invoices',
      'documentation':'documentation','events':'events','community':'community','visualizer':'visualizer'
    };
    return map[view]||null;
  }
  function rc15AssignedPlanForCurrent(){
    const s=rc15Settings().platformAccess;
    if(!s?.enabled)return null;
    let assignmentId='';
    if(isAdmin()){
      if(rc15IsHQ())return null; // HQ governance is never paywalled.
      const p=rc11AdminProfile();
      if(p)assignmentId=s.assignments?.['admin:'+p.id]||'';
    }else{
      const c=currentClient();
      if(c)assignmentId=s.assignments?.[c.id]||'';
    }
    if(!assignmentId)return null; // Explicitly Free / unassigned stays unrestricted.
    return (s.plans||[]).find(p=>p.id===assignmentId)||null;
  }
  const rc15PlanClientNavBase=clientNav;
  clientNav=function(){
    const items=rc15PlanClientNavBase();
    const plan=rc15AssignedPlanForCurrent();
    if(!plan)return items;
    return items.filter(([view])=>{const f=rc15FeatureForView(view,false);return !f||plan.features.includes(f)});
  };
  const rc15PlanAdminNavBase=adminNav;
  adminNav=function(){
    const items=rc15PlanAdminNavBase();
    const plan=rc15AssignedPlanForCurrent();
    if(!plan)return items;
    return items.filter(([view])=>{const f=rc15FeatureForView(view,true);return !f||plan.features.includes(f)});
  };
  const rc15PlanRenderContentBase=renderContent;
  renderContent=function(){
    const plan=rc15AssignedPlanForCurrent(),f=rc15FeatureForView(currentView,isAdmin());
    if(plan&&f&&!plan.features.includes(f)){
      return `<section class="rc11-panel"><span class="eyebrow">ACCESS CONTROL</span><h2>Module not included in your current access grid</h2><p>This module is controlled by your HQ access plan. Contact the administrator responsible for your territory if you need it enabled.</p><div class="toolbar"><button class="btn primary" onclick="go('${isAdmin()?'admin-dashboard':'dashboard'}')">Back to Home</button></div></section>`;
    }
    return rc15PlanRenderContentBase();
  };

  // The original login click listener was bound before the V15 secure login override existed.
  // Rebuild the two auth controls once so every authentication attempt uses V15's 24-hour,
  // role-aware, multi-profile login path rather than the legacy listener.
  function rc15RebindAuthControls(){
    const oldBtn=document.getElementById('loginButton');
    if(oldBtn&&!oldBtn.dataset.rc151Auth){
      const btn=oldBtn.cloneNode(true);btn.dataset.rc151Auth='1';oldBtn.replaceWith(btn);
      btn.addEventListener('click',e=>{e.preventDefault();login()});
    }
    const oldPw=document.getElementById('loginPassword');
    if(oldPw&&!oldPw.dataset.rc151Auth){
      const pw=oldPw.cloneNode(true);pw.dataset.rc151Auth='1';oldPw.replaceWith(pw);
      pw.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();login()}});
    }
  }
  rc15RebindAuthControls();

  // Make the first-login password confirmation resilient to late shell renders/binders.
  rc15CompleteLogin=function(a){
    session={accountId:a.id,impersonatedClientId:null};
    currentView=a.role==='admin'?'admin-dashboard':'dashboard';
    saveStore();showApp();
    if(a.mustConfirmPassword){
      const prompt=()=>{const live=store.accounts.find(x=>x.id===a.id);if(live?.mustConfirmPassword){closeModal();rc15PasswordConfirmation(a.id)}};
      setTimeout(prompt,450);
      setTimeout(()=>{if(store.accounts.find(x=>x.id===a.id)?.mustConfirmPassword&&!document.getElementById('rc15KeepPassword'))prompt()},950);
    }
  };
})();
