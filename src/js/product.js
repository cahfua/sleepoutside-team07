import { getParam, updateCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");
const product = new ProductDetails(productId, dataSource);
product.init();

// Update cart count on page load
updateCartCount();

async findProductById(id) {
  const response = await fetch(`${baseURL}product/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await response.json();
  return data.Result; // API returns { Result: {...} }
}