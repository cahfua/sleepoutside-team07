import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const currentCart = getLocalStorage("so-cart") || [];
    currentCart.push(this.product);
    setLocalStorage("so-cart", currentCart);
    updateCartCount();
  }

  renderProductDetails() {
    const productSection = document.querySelector(".product-detail");
    if (!this.product) {
      productSection.innerHTML = "<p>Product not found</p>";
      return;
    }

    // Get color name if available
    const colorName =
      this.product.Colors && this.product.Colors.length > 0
        ? this.product.Colors[0].ColorName
        : "";
    //  Calculate discount
let discountHTML = "";
const original = this.product.SuggestedRetailPrice;
const final = this.product.FinalPrice;

if (original && original > final) {
  const amountOff = original - final;
  const percentOff = ((amountOff / original) * 100).toFixed(0);
  
  discountHTML = `
    <p class="discount-flag">You save $${amountOff.toFixed(
      2
    )} (${percentOff}% off)</p>
  `;
}
    productSection.innerHTML = `
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${this.product.Image}"
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

