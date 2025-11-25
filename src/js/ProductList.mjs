import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const small =
    product.Images?.PrimarySmall ||
    product.Images?.PrimaryMedium ||
    product.Image ||
    "/images/placeholder.png";

  const medium =
    product.Images?.PrimaryMedium ||
    product.Images?.PrimaryLarge ||
    product.Image ||
    "/images/placeholder.png";

  const large =
    product.Images?.PrimaryLarge ||
    product.Images?.PrimaryMedium ||
    product.Image ||
    "/images/placeholder.png";

  return `<li class="product-card">
    <a href="../product_pages/?product=${product.Id}">
      <img
        src="${medium}"
        srcset="
          ${small} 400w,
          ${medium} 800w,
          ${large} 1200w
        "
        sizes="
          (max-width: 600px) 90vw,
          (max-width: 900px) 40vw,
          20vw
        "
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
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}