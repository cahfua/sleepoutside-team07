import { getLocalStorage, updateCartCount } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  // Image fallback logic - same as ProductDetails.mjs
  const imageUrl =
    item.Images?.PrimaryLarge || item.Images?.PrimaryMedium || item.Image || "";

  // Color name handling
  const colorName =
    item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : "";

  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imageUrl}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  ${colorName ? `<p class="cart-card__color">${colorName}</p>` : ""}
  <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

// for the total item
function renderCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];

  const footer = document.querySelector(".cart-footer");
  const totalElement = document.querySelector(".cart-total");

  if (!footer || !totalElement) return;

  if (cartItems.length === 0) {
    footer.classList.add("hide");
    return;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
    0,
  );

  footer.classList.remove("hide");
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

renderCartContents();
renderCartTotal();
updateCartCount();
