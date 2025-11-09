import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?products=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

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

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);

  }

 }
