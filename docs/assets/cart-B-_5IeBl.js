import{u as s,g as r}from"./utils-BcWnTT7J.js";function l(){const a=r("so-cart").map(e=>i(e));document.querySelector(".product-list").innerHTML=a.join("")}function i(t){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`}function d(){const t=r("so-cart")||[],a=document.querySelector(".cart-footer"),e=document.querySelector(".cart-total");if(!a||!e)return;if(t.length===0){a.classList.add("hide");return}const c=t.reduce((o,n)=>o+n.FinalPrice,0);a.classList.remove("hide"),e.textContent=`Total: $${c.toFixed(2)}`}l();d();s();
