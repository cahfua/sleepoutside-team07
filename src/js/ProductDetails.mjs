import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = null;
  }

  async init() {
    // Fetch product details by ID
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    // Add listener to the "Add to Cart" button
    const addButton = document.getElementById("addToCart");
    if (addButton) {
      addButton.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    const currentCart = getLocalStorage("so-cart") || [];
    currentCart.push(this.product);
    setLocalStorage("so-cart", currentCart);
    alert(`${this.product.Name} added to cart!`);
  }

  renderProductDetails() {
    const productSection = document.querySelector(".product-detail");

    if (!this.product) {
      productSection.innerHTML = "<p>Product not found.</p>";
      return;
    }

    const colorName =
      this.product.Colors?.[0]?.ColorName ? this.product.Colors[0].ColorName : "";

    productSection.innerHTML = `
      <h3>${this.product.Brand?.Name || "Unknown Brand"}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img class="divider" src="${this.product.Image}" alt="${this.product.Name}" loading="lazy" />
      <p class="product-card__price">$${(this.product.FinalPrice ?? 0).toFixed(2)}</p>
      ${colorName ? `<p class="product__color">${colorName}</p>` : ""}
      <p class="product__description">${this.product.DescriptionHtmlSimple || "No description available."}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
  }
}
