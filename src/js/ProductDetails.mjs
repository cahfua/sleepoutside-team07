export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = null;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProduct();
  }

  renderProduct() {
    const container = document.querySelector(".product-detail");
    container.innerHTML = `
      <h1>${this.product.Name}</h1>
      <h2>${this.product.Brand.Name}</h2>
      <img src="${this.product.Images.PrimaryLarge}" alt="${this.product.Name}" />
      <p>Price: $${this.product.FinalPrice.toFixed(2)}</p>
      <p>${this.product.Description || ""}</p>
    `;
  }
}
