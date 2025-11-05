import { getLocalStorage, setLocalStorage, setClick } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Add a product to the cart array in localStorage
function addProductToCart(product) {
  // 1. Get existing cart items or empty array
  let cart = getLocalStorage("so-cart") || [];

  // 2. Add the new product
  cart.push(product);

  // 3. Save updated cart
  setLocalStorage("so-cart", cart);

  console.log("Cart updated:", cart); // For debugging
}

// Event handler for the Add to Cart button
async function addToCartHandler(e) {
  const productId = e.target.dataset.id; // gets product ID from the button
  const product = await dataSource.findProductById(productId);

  if (!product) {
    console.error(`Product with ID ${productId} not found.`);
    return;
  }

  addProductToCart(product);
  alert(`${product.Name} has been added to your cart!`);
}

// Attach event listener (supports both click and touch)
setClick("#addToCart", addToCartHandler);
