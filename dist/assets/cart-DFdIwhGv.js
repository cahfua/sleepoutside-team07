import{u as e,g as c}from"./utils-Drd66AoB.js";/* empty css              */function s(){const a=c("so-cart")||[];if(a.length===0){document.querySelector(".product-list").innerHTML=`
      <li class="cart-card empty">
        <p>Your cart is empty.</p>
        <p><a href="../index.html">Continue shopping</a></p>
      </li>`;return}const r=a.map(t=>n(t));document.querySelector(".product-list").innerHTML=r.join("")}function n(a){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${a.Image.replace("../images/","../public/images/")}"
      alt="${a.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${a.Name}</h2>
  </a>
  <p class="cart-card__color">${a.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${a.FinalPrice}</p>
</li>`}s();e();
