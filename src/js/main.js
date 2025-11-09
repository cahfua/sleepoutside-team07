import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs } from "./utils.mjs";

// Create an instance of ProductData for tents
const dataSource = new ProductData("tents");

// Get the list element
const listElement = qs(".product-list");

// Create an instance of ProductList
const productList = new ProductList("tents", dataSource, listElement);

// Initialize and render the product list
productList.init();
