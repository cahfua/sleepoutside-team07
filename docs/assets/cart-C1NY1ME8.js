import{u as n,g as s}from"./utils-BZuxY1Lt.js";function l(){const a=(s("so-cart")||[]).map(r=>d(r));document.querySelector(".product-list").innerHTML=a.join("")}function d(t){var c,e;const a=((c=t.Images)==null?void 0:c.PrimaryLarge)||((e=t.Images)==null?void 0:e.PrimaryMedium)||t.Image||"",r=t.Colors&&t.Colors.length>0?t.Colors[0].ColorName:"";return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${a}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  ${r?`<p class="cart-card__color">${r}</p>`:""}
  <p class="cart-card__quantity">qty: ${t.quantity||1}</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`}function i(){const t=s("so-cart")||[],a=document.querySelector(".cart-footer"),r=document.querySelector(".cart-total");if(!a||!r)return;if(t.length===0){a.classList.add("hide");return}const o=t.reduce((c,e)=>c+e.FinalPrice*(e.quantity||1),0);a.classList.remove("hide"),r.textContent=`Total: $${o.toFixed(2)}`}l();i();n();
