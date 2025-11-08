export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource; // an instance of ProductData
    this.listElement = listElement; // HTML element where products will display
  }

  async init() {
    // Get product data from dataSource (async)
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    // Clear any existing content
    this.listElement.innerHTML = "";

    // Loop through each product and build HTML
    const productCards = list.map(product => this.renderProductCard(product)).join("");
    this.listElement.innerHTML = productCards;
  }

  renderProductCard(product) {
    return `
      <li class="product-card">
        <a href="./product_pages/index.html?product=${product.Id}">
          <img src="${product.Image}" alt="${product.Name}" loading="lazy">
          <h3 class="card__brand">${product.Brand}</h3>
          <h2 class="card__name">${product.Name}</h2>
          <p class="card__price">$${product.FinalPrice}</p>
        </a>
      </li>
    `;
  }
 }
