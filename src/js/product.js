import { getParam, updateCartCount, qs } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
const dataSource = new ExternalServices();
const product = new ProductDetails(productId, dataSource);

product.init().then(() => {
  const breadcrumb = qs(".breadcrumb");
  if (breadcrumb) {
    let categoryName = "Product";
    if (product.product && product.product.Category) {
      categoryName = product.product.Category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    breadcrumb.textContent = categoryName;
  }
});

// Update cart count on page load
updateCartCount();
