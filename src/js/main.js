import Alert from "./Alert.js";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { qs, updateCartCount } from "./utils.mjs";

function updateBreadcrumb(category, count) {
  const breadcrumb = qs(".breadcrumb");
  if (breadcrumb) {
    breadcrumb.textContent = `${category} → (${count} items)`;
  }
}

// Create an instance of Alert
new Alert();

// Create an instance of ExternalServices
const dataSource = new ExternalServices();

// Get the list element
const listElement = qs(".product-list");

// Create an instance of ProductList
const productList = new ProductList("tents", dataSource, listElement);

productList.init().then(() => {
  updateBreadcrumb(
    productList.category.charAt(0).toUpperCase() + productList.category.slice(1),
    productList.products.length
  );
});

// Update cart count on page load
updateCartCount();
