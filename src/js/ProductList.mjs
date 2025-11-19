import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img
        src="${product.Image.replace("../images/", "/images/")}"
        alt="${product.NameWithoutBrand || product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand || product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();

    // check for search term in the URL
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get("search");

    let productsToRender = list;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();

      productsToRender = list.filter((product) => {
        const name = (product.Name || "").toLowerCase();
        const brand = (product.Brand?.Name || "").toLowerCase();
        const shortName = (product.NameWithoutBrand || "").toLowerCase();

        return (
          name.includes(term) ||
          brand.includes(term) ||
          shortName.includes(term)
        );
      });
    }

    this.renderList(productsToRender);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
