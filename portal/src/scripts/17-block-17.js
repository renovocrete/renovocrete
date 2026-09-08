(function(){
  rc15BindDashboardLinks=function(){
    const cards=[...document.querySelectorAll('#content .rc-v10-kpi,#content .metric-card,#content .rc11-kpi,#content .card.kpi,#content .rc14-kpi-link')];
    cards.forEach(card=>{
      const text=card.textContent.toLowerCase();let view='';
      if(text.includes('revenue')||text.includes('collected'))view='invoices';
      else if(text.includes('outstanding')||text.includes('balance')||text.includes('unpaid')||text.includes('overdue'))view='receivables';
      else if(text.includes('professional')||text.includes('client'))view='clients';
      else if(text.includes('order'))view='global-orders';
      else if(text.includes('message'))view='admin-messages';
      if(view){card.classList.add('rc15-clickable');card.tabIndex=0;card.setAttribute('role','button');card.dataset.rc15Target=view;card.onclick=()=>go(view);card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go(view)}}}
    });
    document.querySelectorAll('#content .rc101-chart,#content .bar-chart,#content .rc11-chart').forEach(el=>{el.classList.add('rc15-clickable');el.tabIndex=0;el.setAttribute('role','button');el.dataset.rc15Target='global-orders';el.onclick=()=>go('global-orders')});
  };
})();
