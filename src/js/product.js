import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

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

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");
  if (!Array.isArray(cart)) cart = cart ? [cart] : [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
  updateCartCount();
}

async function addToCartHandler(e) {
  e.preventDefault();
  const id = e.currentTarget.dataset.id;
  if (!id) {
    // console.warn("No data-id on Add to Cart button");
    return;
  }

  e.currentTarget.disabled = true;
  e.currentTarget.textContent = "Added!";
  setTimeout(() => {
    e.currentTarget.disabled = false;
    e.currentTarget.textContent = "Add to Cart";
  }, 700);

  const product = await dataSource.findProductById(id);
  addProductToCart(product);
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("addToCart");
  if (!btn) {
    updateCartCount();
    return;
  }
  btn.setAttribute("type", "button");
  btn.addEventListener("click", addToCartHandler);
  updateCartCount();
});
