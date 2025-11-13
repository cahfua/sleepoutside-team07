import { updateCartCount, loadHeaderFooter } from "./utils.mjs";

// Initialize page
async function init() {
  // Load header and footer
  await loadHeaderFooter();

  // Update cart count on page load
  updateCartCount();
}

init();
