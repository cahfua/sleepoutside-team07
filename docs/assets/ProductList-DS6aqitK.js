import{r as h}from"./utils-BZuxY1Lt.js";function c(a){var r,m,t,l,n,g;const e=((r=a.Images)==null?void 0:r.PrimarySmall)||((m=a.Images)==null?void 0:m.PrimaryMedium)||a.Image||"/images/placeholder.png",s=((t=a.Images)==null?void 0:t.PrimaryMedium)||((l=a.Images)==null?void 0:l.PrimaryLarge)||a.Image||"/images/placeholder.png",i=((n=a.Images)==null?void 0:n.PrimaryLarge)||((g=a.Images)==null?void 0:g.PrimaryMedium)||a.Image||"/images/placeholder.png";return`<li class="product-card">
    <a href="../product_pages/?product=${a.Id}">
      <img
        src="${s}"
        srcset="
          ${e} 400w,
          ${s} 800w,
          ${i} 1200w
        "
        sizes="
          (max-width: 600px) 90vw,
          (max-width: 900px) 40vw,
          20vw
        "
        alt="${a.NameWithoutBrand||a.Name}"
      />
      <h3 class="card__brand">${a.Brand.Name}</h3>
      <h2 class="card__name">${a.NameWithoutBrand||a.Name}</h2>
      <p class="product-card__price">$${a.FinalPrice.toFixed(2)}</p>
    </a>
  </li>`}class o{constructor(e,s,i){this.category=e,this.dataSource=s,this.listElement=i}async init(){const e=await this.dataSource.getData(this.category);this.renderList(e)}renderList(e){h(c,this.listElement,e)}}export{o as P};
