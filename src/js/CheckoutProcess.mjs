import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const TAX_RATE = 0.06;
const BASE_SHIPPING = 10;
const EXTRA_ITEM_SHIPPING = 2;

function formDataToJSON(formData) {
  const obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

// takes the items currently stored in the cart
function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity || 1,
  }));
}

export default class CheckoutProcess {
  constructor(cartKey) {
    this.cartKey = cartKey;
    this.items = getLocalStorage(this.cartKey) || [];
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.total = 0;
    this.services = new ExternalServices();
  }

  // calculate and display item subtotal when page loads
  calculateItemSummary() {
    this.subtotal = this.items.reduce(
      (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
      0,
    );
    const subtotalElement = document.querySelector("#summary-subtotal");
    if (subtotalElement) {
      subtotalElement.textContent = `$${this.subtotal.toFixed(2)}`;
    }
  }

  // calculate and display tax, shipping, and order total. called after zip.
  calculateOrderTotals() {
    const itemCount = this.items.length;

    if (itemCount === 0) {
      this.shipping = 0;
    } else {
      this.shipping = BASE_SHIPPING + EXTRA_ITEM_SHIPPING * (itemCount - 1);
    }

    this.tax = this.subtotal * TAX_RATE;
    this.total = this.subtotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  // Display the calculated totals in the order summary
  displayOrderTotals() {
    const taxElement = document.querySelector("#summary-tax");
    const shippingElement = document.querySelector("#summary-shipping");
    const totalElement = document.querySelector("#summary-total");

    if (taxElement) {
      taxElement.textContent = `$${this.tax.toFixed(2)}`;
    }
    if (shippingElement) {
      shippingElement.textContent = `$${this.shipping.toFixed(2)}`;
    }
    if (totalElement) {
      totalElement.textContent = `$${this.total.toFixed(2)}`;
    }
  }

  // Reset tax, shipping, and total to $0.00 when zip is empty
  resetOrderTotals() {
    this.tax = 0;
    this.shipping = 0;
    this.total = 0;
    this.displayOrderTotals();
  }
  
  // prepare the JSON order object/send it to ExternalServices
  async checkout(form) {
    try {
      const formData = new FormData(form);
      const order = formDataToJSON(formData);

      order.orderDate = new Date().toISOString();
      order.items = packageItems(this.items);
      order.orderTotal = this.total.toFixed(2);
      order.shipping = this.shipping;
      order.tax = this.tax.toFixed(2);

      await this.services.checkout(order);

      // Handle successful checkout
      // Clear the cart
      setLocalStorage(this.cartKey, []);

      // Redirect to success page
      window.location.href = "../checkout/success.html";
    } catch (err) {
      // Handle error
      if (err.name === "servicesError") {
        const errorMessages = this.extractErrorMessages(err.message);
        errorMessages.forEach((msg) => {
          alertMessage(msg, true);
        });
      } else {
        // Display generic error message
        alertMessage(
          "An error occurred during checkout. Please try again.",
          true,
        );
      }
    }
  }

  extractErrorMessages(errorObj) {
    if (!errorObj) {
      return ["An error occurred. Please try again."];
    }

    // If it's already a string, return it
    if (typeof errorObj === "string") {
      return [errorObj];
    }

    // Extract error messages from object values
    // e.g., { "cardNumber": "Invalid Card Number" } -> ["Invalid Card Number"]
    const messages = Object.values(errorObj).filter(
      (value) => typeof value === "string",
    );

    // If no messages were extracted, return a default message
    if (messages.length === 0) {
      return ["Please check your information and try again."];
    }

    return messages;
  }
}
