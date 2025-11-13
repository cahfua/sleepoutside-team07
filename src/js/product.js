import { getParam, updateCartCount, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Initialize page
async function init() {
  // Load header and footer
  await loadHeaderFooter();

  const productId = getParam("product");
  const dataSource = new ProductData("tents");
  const product = new ProductDetails(productId, dataSource);
  product.init();

  // Update cart count on page load
  updateCartCount();
}

init();
