import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const currentCart = getLocalStorage("so-cart") || [];
  currentCart.push(product);
  setLocalStorage("so-cart", currentCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
const product = new ProductDetails(productId, dataSource);
product.init();

// import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";
// import ProductDetails from "./ProductDetails.mjs";

// document.addEventListener("DOMContentLoaded", async () => {
//   const productId = getParam("product");
//   const dataSource = new ProductData("tents");
//   const product = new ProductDetails(productId, dataSource);
//   await product.init();

//   document
//     .getElementById("addToCart")
//     ?.addEventListener("click", async (e) => {
//       const product = await dataSource.findProductById(e.target.dataset.id);
//       const cart = getLocalStorage("so-cart") || [];
//       cart.push(product);
//       setLocalStorage("so-cart", cart);
//     });
// });




// import { getLocalStorage, setLocalStorage,getParam } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";
// import ProductDetails from "./ProductDetails.mjs";

// const productId = getParam("product");
// const dataSource = new ProductData("tents");

// function addProductToCart(product) {
//   const currentCart = getLocalStorage("so-cart") || [];
//   currentCart.push(product);
//   setLocalStorage("so-cart", currentCart);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
// const product = new ProductDetails(productId, dataSource);
// product.init();