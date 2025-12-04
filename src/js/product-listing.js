import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, updateCartCount, qs } from "./utils.mjs";

const category = getParam("category");

// Update page title with category
function updatePageTitle(value) {
  const titleElement = document.getElementById("page-title");
  if (titleElement && value) {
    // Capitalize first letter and replace hyphens with spaces
    const categoryName = value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    titleElement.textContent = `Top Products: ${categoryName}`;
  }
}

function updateBreadcrumb(cat, count) {
  const breadcrumb = qs(".breadcrumb");
  if (breadcrumb) {
    const categoryName = cat
      ? cat.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
      : "Products";
    breadcrumb.textContent = `${categoryName} → (${count} items)`;
  }
}

// first create an instance of the ExternalServices class.
const dataSource = new ExternalServices();
// then get the element you want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of the ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show the products
typeof myList.init === "function"
  ? myList.init().then(() => {
      updateBreadcrumb(category, myList.products.length);
    })
  : updateBreadcrumb(category, 0);

// Update page title
updatePageTitle(category);

// Update cart count on page load
updateCartCount();
