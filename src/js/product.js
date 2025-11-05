import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Add a product to the cart array in localStorage
function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
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
