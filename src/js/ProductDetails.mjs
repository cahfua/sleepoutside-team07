import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const currentCart = getLocalStorage("so-cart") || [];
    const existingItemIndex = currentCart.findIndex(
      (item) => item.Id === this.product.Id
    );

    if (existingItemIndex !== -1) {
      const existingItem = currentCart[existingItemIndex];
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      const newItem = { ...this.product, quantity: 1 };
      currentCart.push(newItem);
    }

    setLocalStorage("so-cart", currentCart);
    updateCartCount();
  }

  renderProductDetails() {
    const productSection = document.querySelector(".product-detail");

    if (!this.product) {
      productSection.innerHTML = "<p>Product not found</p>";
      return;
    }

    // Image fallback logic
    const imageUrl =
      this.product.Images?.PrimaryLarge ||
      this.product.Images?.PrimaryMedium ||
      this.product.Image ||
      "images/placeholder.png";

    // Color name handling
    const colorName =
      this.product.Colors && this.product.Colors.length > 0
        ? this.product.Colors[0].ColorName
        : "";

    // Discount flag logic
    let discountHTML = "";
    const original = this.product.SuggestedRetailPrice;
    const final = this.product.FinalPrice;

    if (Number(original) > Number(final)) {
      const amountOff = original - final;
      const percentOff = ((amountOff / original) * 100).toFixed(0);

      discountHTML = `
        <p class="discount-flag">You save $${amountOff.toFixed(2)} (${percentOff}% off)</p>
      `;
    }

    productSection.innerHTML = `
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>

      <img class="divider" src="${imageUrl}" alt="${this.product.Name}" />

      <p class="product-card__price">$${final.toFixed(2)}</p>

      ${discountHTML}

      ${colorName ? `<p class="product__color">${colorName}</p>` : ""}

      <p class="product__description">
        ${this.product.DescriptionHtmlSimple || ""}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
  }
}
