(() => {
  const fields = {
    firstName:'First name',lastName:'Last name',role:'Role',specialties:'Specialties',intro:'Introduction',
    biography:'Biography',location:'Location and availability',email:'Public contact email',
    linkedin:'LinkedIn URL',instagram:'Instagram URL',shop:'Shop URL',
    heroLight:'Light hero image URL',heroEvening:'Blue hero image URL',heroDark:'Dark hero image URL'
  };
  let profile={};
  const text=(selector,value)=>document.querySelectorAll(selector).forEach(el=>{el.textContent=value||'';});
  const safeURL=value=>{try{const u=new URL(value,location.href);return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}};
  window.SiteProfile={
    get(){return {...profile};},
    set(value={}){profile={...value};},
    apply(value={},data={}){
      profile={...value};
      const name=[profile.firstName,profile.lastName].filter(Boolean).join(' ');
      if(!name)return;
      document.title=name+' — Portfolio';
      text('.hero-name span:first-child',profile.firstName);text('.hero-name-italic',profile.lastName);
      text('.hero-eyebrow-role',profile.role);text('.hero-title em',profile.specialties);text('.hero-title span',profile.intro);
      text('.about-bio',profile.biography);document.querySelectorAll('.about-bio').forEach(el=>el.style.whiteSpace='pre-line');
      text('#page-about h1 em',profile.firstName);text('.footer-name',name);text('.footer-sub',profile.location);
      const stats=document.querySelectorAll('.about-stat-num');[data.novels?.length,data.tech?.length,data.clients?.length].forEach((n,i)=>{if(stats[i]&&n!==undefined)stats[i].textContent=n;});
      document.querySelectorAll('.footer-links').forEach(links=>{
        for(const [key,match] of [['linkedin','linkedin'],['instagram','instagram'],['shop','blendermarket'],['email','mailto:']]){
          const a=[...links.querySelectorAll('a')].find(a=>a.getAttribute('href')?.includes(match));if(!a)continue;
          const url=key==='email'?(profile.email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)?'mailto:'+profile.email:''):safeURL(profile[key]);
          a.hidden=!url;if(url)a.href=url;
        }
      });
      for(const [key,id] of [['heroLight','heroLayerLight'],['heroEvening','heroLayerEvening'],['heroDark','heroLayerDark']]){
        const el=document.getElementById(id),url=safeURL(profile[key]);if(el&&url)el.style.setProperty('background-image',`url(${JSON.stringify(url)})`,'important');
      }
    },
    render(){
      const form=document.getElementById('profile-fields');if(!form)return;form.replaceChildren();
      for(const [key,label] of Object.entries(fields)){
        const wrap=document.createElement('label');wrap.className='form-label';wrap.style.cssText='display:block;margin:18px 0';wrap.textContent=label;
        const input=document.createElement(key==='biography'?'textarea':'input');input.className='form-input';input.value=profile[key]||'';input.style.width='100%';if(key==='biography')input.rows=8;
        input.oninput=()=>{profile[key]=input.value;window.markUnsavedChanges?.();};wrap.append(input);form.append(wrap);
      }
    }
  };
})();
