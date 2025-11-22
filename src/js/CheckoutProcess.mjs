import { getLocalStorage } from "./utils.mjs";
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
    quantity: 1,
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
      (sum, item) => sum + item.FinalPrice,
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

    document.querySelector("#summary-tax").textContent =
      `$${this.tax.toFixed(2)}`;
    document.querySelector("#summary-shipping").textContent =
      `$${this.shipping.toFixed(2)}`;
    document.querySelector("#summary-total").textContent =
      `$${this.total.toFixed(2)}`;
  }

  // prepare the JSON order object/send it to ExternalServices
  async checkout(form) {
    const formData = new FormData(form);
    const order = formDataToJSON(formData);

    order.orderDate = new Date().toISOString();
    order.items = packageItems(this.items);
    order.orderTotal = this.total.toFixed(2);
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);

    const result = await this.services.checkout(order);
    console.log("Server response:", result);
  }
}