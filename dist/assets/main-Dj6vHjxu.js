import{r as i,q as n,u as r}from"./utils-Drd66AoB.js";/* empty css              */import{P as c}from"./ProductData-BwwaTLkU.js";function l(t){const e=t.FinalPrice<t.SuggestedRetailPrice;let a="";return e&&(a=`<span class="discount-badge">Save ${Math.round((t.SuggestedRetailPrice-t.FinalPrice)/t.SuggestedRetailPrice*100)}%</span>`),`<li class="product-card">
    <a href="product_pages/?product=${t.Id}">
      <img
        src="${t.Image.replace("../images/","./public/images/")}"
        alt="${t.NameWithoutBrand||t.Name}"
      />
      <h3 class="card__brand">${t.Brand.Name}</h3>
      <h2 class="card__name">${t.NameWithoutBrand||t.Name}</h2>
      <p class="product-card__price">$${t.FinalPrice.toFixed(2)} ${a}</p>
    </a>
  </li>`}class d{constructor(e,a,s){this.category=e,this.dataSource=a,this.listElement=s}async init(){const e=await this.dataSource.getData();this.renderList(e)}renderList(e){i(l,this.listElement,e)}}const o=new c("tents"),m=n(".product-list"),u=new d("tents",o,m);u.init();r();
