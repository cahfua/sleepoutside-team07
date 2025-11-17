import{r as u,q as c,u as h}from"./utils-BcWnTT7J.js";import{P as p}from"./ProductData-CbvbBcly.js";class f{constructor(){this.init()}async init(){const t=await this.loadAlerts();this.renderAlerts(t)}async loadAlerts(){try{const t=await fetch("/json/alerts.json");if(t.ok)return await t.json()}catch{return[]}}renderAlerts(t){const n=document.querySelector("main");if(t&&t.length>0&&n){const r=document.createElement("section");r.classList.add("alert-list"),t.forEach(a=>{const s=document.createElement("p");s.textContent=a.message,s.style.backgroundColor=a.background,s.style.color=a.color,r.appendChild(s)}),n.prepend(r)}}}function w(e){return`<li class="product-card">
    <a href="product_pages/?product=${e.Id}">
      <img
        src="${e.Image.replace("../images/","/images/")}"
        alt="${e.NameWithoutBrand||e.Name}"
      />
      <h3 class="card__brand">${e.Brand.Name}</h3>
      <h2 class="card__name">${e.NameWithoutBrand||e.Name}</h2>
      <p class="product-card__price">$${e.FinalPrice.toFixed(2)}</p>
    </a>
  </li>`}class L{constructor(t,n,r){this.category=t,this.dataSource=n,this.listElement=r}async init(){const t=await this.dataSource.getData(),r=new URLSearchParams(window.location.search).get("search");let a=t;if(r){const s=r.toLowerCase();a=t.filter(o=>{var i;const l=(o.Name||"").toLowerCase(),d=(((i=o.Brand)==null?void 0:i.Name)||"").toLowerCase(),m=(o.NameWithoutBrand||"").toLowerCase();return l.includes(s)||d.includes(s)||m.includes(s)})}this.renderList(a)}renderList(t){u(w,this.listElement,t)}}new f;const g=new p("tents"),C=c(".product-list"),y=new L("tents",g,C);y.init();function E(){const e=c("#product-search-form"),t=c("#product-search-input");!e||!t||e.addEventListener("submit",n=>{n.preventDefault();const r=t.value.trim();if(!r)return;const a=new URLSearchParams({search:r});window.location.href=`index.html?${a.toString()}`})}E();h();
