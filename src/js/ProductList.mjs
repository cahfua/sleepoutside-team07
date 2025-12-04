import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const imageUrl = product.Images?.PrimaryMedium || product.Image || "/images/placeholder.jpg";
  const brandName = product.Brand?.Name || "Unknown Brand";
  const productName = product.NameWithoutBrand || product.Name || "Unknown Product";
  const price = product.FinalPrice || product.ListPrice || 0;

  return `<li class="product-card">
    <a href="../product_pages/?product=${product.Id}">
      <img src="${imageUrl}" alt="${productName}" />
      <h3 class="card__brand">${brandName}</h3>
      <h2 class="card__name">${productName}</h2>
      <p class="product-card__price">$${price.toFixed(2)}</p>
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
    try {
      const data = await this.dataSource.getData(this.category);

      this.products = Array.isArray(data) 
        ? data.filter(product => product && product.Id)
        : [];

      if (this.products.length === 0) {
        this.listElement.innerHTML = '<li class="no-products">No products found in this category</li>';
        return;
      }

      this.renderList(this.products);
      this.addSortHandler();
    } catch (error) {
      this.listElement.innerHTML = '<li class="error">Error loading products. Please try again later.</li>';
    }
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
