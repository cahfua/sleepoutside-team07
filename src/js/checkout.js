import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart");

// when the page loads, calculate and display the subtotal
checkout.calculateItemSummary();
// Initialize tax, shipping, and total to $0.00
checkout.resetOrderTotals();

// after user fills zip code, the tax, shipping, and total will be calculated
document.querySelector("#zip").addEventListener("blur", (e) => {
  const zipValue = e.target.value.trim();
  if (zipValue) {
    checkout.calculateOrderTotals();
  } else {
    checkout.resetOrderTotals();
  }
});

// when form is submitted, avoid the default and run checkout
const form = document.querySelector("#checkout-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const chk_status = form.checkValidity();
  form.reportValidity();
  if (chk_status) {
    checkout.checkout(form);
  }
});
