import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

// Get the category from the URL
const category = getParam("category");

// Create a data source instance
const dataSource = new ProductData();

// Get the element where the products will be rendered
const listElement = document.querySelector(".product-list");

// Create a ProductList instance with the category, data source, and element
const myList = new ProductList(category, dataSource, listElement);

// Initialize the list (this will fetch products for the category and render them)
myList.init();


