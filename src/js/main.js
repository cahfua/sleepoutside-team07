import Alert from "./Alert.js";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs, updateCartCount } from "./utils.mjs";

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

// Initialize product search in the navbar
function initProductSearch() {
    const form = qs("#product-search-form");
    const input = qs("#product-search-input");

    if (!form || !input) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = input.value.trim();
        if (!query) return;

        const params = new URLSearchParams({ search: query });
        window.location.href = `index.html?${params.toString()}`;
    });    
}

initProductSearch();

// Update cart count on page load
updateCartCount();
