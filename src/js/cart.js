import { getLocalStorage } from "./utils.mjs";

function updateCartCount() {
  const link = document.querySelector(".cart a");
  if (!link) return;

  let badge = document.getElementById("cart-count");
  if (!badge) {
    badge = document.createElement("span");
    badge.id = "cart-count";
    badge.style.cssText = `
      position:absolute; top:-6px; right:-6px;
      min-width:18px; height:18px; padding:0 4px;
      border-radius:9px; font-size:12px; line-height:18px;
      text-align:center; color:#fff; background:#e74c3c;
      box-shadow:0 0 0 1px #fff;
    `;
    link.style.position = "relative";
    link.appendChild(badge);
  }

  const raw = getLocalStorage("so-cart");
  const count = Array.isArray(raw) ? raw.length : raw ? 1 : 0;
  badge.textContent = count;
  badge.hidden = count === 0;
}

function renderCartContents() {
  const raw = getLocalStorage("so-cart") || [];
  const cartItems = Array.isArray(raw) ? raw : [raw];
  const htmlItems = cartItems.map(cartItemTemplate);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const imgPath = item.Image.replace(/^\.\.\//, "/");

  const newItem = `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${imgPath}" alt="${item.Name}" />
    </a>
    <a href="#"><h2 class="card__name">${item.Name}</h2></a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

renderCartContents();
updateCartCount();
