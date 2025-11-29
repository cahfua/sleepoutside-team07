import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
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
    this.products = []; // store products for sorting
  }

  async init() {
    this.products = await this.dataSource.getData(this.category); // store data!
    this.renderList(this.products);
    this.addSortHandler();
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  // -------------------------
  // SORT HANDLER 
  // -------------------------
  addSortHandler() {
    const sortSelect = document.getElementById("sort");
    if (!sortSelect) return; 

    sortSelect.addEventListener("change", () => {
      let sortedProducts = [...this.products]; // copy array

      // Sort by Name
      if (sortSelect.value === "name") {
        sortedProducts.sort((a, b) =>
          (a.NameWithoutBrand || a.Name).localeCompare(
            b.NameWithoutBrand || b.Name
          )
        );
      }

      // Sort by Price
      if (sortSelect.value === "price") {
        sortedProducts.sort((a, b) => a.FinalPrice - b.FinalPrice);
      }

      
      this.renderList(sortedProducts);
    });
  }
}