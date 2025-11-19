import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart");

// when the page loads, calculate and display the subtotal
checkout.calculateItemSummary();

// after user fills zip code, the tax, shipping, and total will be calculated
document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotals();
});

// when form is submitted, avoid the default and run checkout
const form = document.querySelector("#checkout-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkout.checkout(form);
});
