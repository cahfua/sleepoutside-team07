import { getLocalStorage, setLocalStorage, updateCartCount, alertMessage } from "./utils.mjs";

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
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`, false);
  }

  renderProductDetails() {
    const productSection = document.querySelector(".product-detail");

    if (!this.product) {
      productSection.innerHTML = "<p>Product not found</p>";
      return;
    }

    // Responsive image fallback logic
    const smallImage =
      this.product.Images?.PrimarySmall ||
      this.product.Images?.PrimaryMedium ||
      this.product.Image ||
      "/images/placeholder.png";

    const mediumImage =
      this.product.Images?.PrimaryMedium ||
      this.product.Images?.PrimaryLarge ||
      this.product.Image ||
      "/images/placeholder.png";

    const largeImage =
      this.product.Images?.PrimaryLarge ||
      this.product.Images?.PrimaryMedium ||
      this.product.Image ||
      "/images/placeholder.png";

    // Color name handling
    const colorName =
      this.product.Colors && this.product.Colors.length > 0
        ? this.product.Colors[0].ColorName
        : "";

    productSection.innerHTML = `
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${mediumImage}"
        srcset="
          ${smallImage} 400w,
          ${mediumImage} 800w,
          ${largeImage} 1200w
        "
        sizes="
          (max-width: 600px) 90vw,
          (max-width: 900px) 50vw,
          40vw
        "
        alt="${this.product.Name}"
      />

      <p class="product-card__price">$${this.product.FinalPrice.toFixed(2)}</p>

      ${colorName ? `<p class="product__color">${colorName}</p>` : ""}

      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
  }
}