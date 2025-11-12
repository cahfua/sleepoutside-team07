import Alert from "./Alert.js";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs, updateCartCount } from "./utils.mjs";
import { loadHeaderFooter } from './utils.mjs';


// Create an instance of Alert
new Alert();

// Create an instance of ProductData for tents
const dataSource = new ProductData("tents");

// Get the list element
const listElement = qs(".product-list");

// Create an instance of ProductList
const productList = new ProductList("tents", dataSource, listElement);

// Initialize and render the product list
productList.init();


// Update cart count on page load
updateCartCount();

// Call load and footer
loadHeaderFooter();



