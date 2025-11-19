import Alert from "./Alert.js";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { qs, updateCartCount } from "./utils.mjs";

// Create an instance of Alert
new Alert();

// Create an instance of ExternalServices for tents
const dataSource = new ExternalServices("tents");

// Get the list element
const listElement = qs(".product-list");

// Create an instance of ProductList
const productList = new ProductList("tents", dataSource, listElement);

// Initialize and render the product list
productList.init();

// Update cart count on page load
updateCartCount();
