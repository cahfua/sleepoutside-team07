import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, updateCartCount } from "./utils.mjs";

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

// first create an instance of the ExternalServices class.
const dataSource = new ExternalServices();
// then get the element you want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of the ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show the products
myList.init();

// Update page title
updatePageTitle(category);

// Update cart count on page load
updateCartCount();
