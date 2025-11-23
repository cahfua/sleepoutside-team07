// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// get parameter from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// render list with template function
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// update cart count badge
export function updateCartCount() {
  const cartCountElement = qs(".cart-count");
  if (!cartCountElement) return;

  try {
    const cartItems = getLocalStorage("so-cart");
    const count = cartItems
      ? cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
      : 0;
    cartCountElement.textContent = count;
    cartCountElement.style.display = count > 0 ? "block" : "none";
  } catch (error) {
    cartCountElement.textContent = "0";
    cartCountElement.style.display = "none";
  }
}

// create and display alert message
export function alertMessage(message, scroll = true) {
  // create element to hold the alert
  const alert = document.createElement("div");
  // add a class to style the alert
  alert.classList.add("alert");
  
  // set the contents. You should have a message and an X or something the user can click on to remove
  // Ensure message is always a string and properly escaped
  const messageText = typeof message === "string" ? message : String(message);
  alert.innerHTML = `
    <span class="alert-message">${messageText}</span>
    <span class="alert-close">×</span>
  `;
  
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", function(e) {
    // Check if they clicked on the X (close button)
    // hint: check out e.target.tagName or e.target.innerText
    if (e.target.classList.contains("alert-close") || 
        e.target.tagName === "SPAN" && e.target.innerText === "×") {
      const mainElement = document.querySelector("main");
      if (mainElement && mainElement.contains(this)) {
        mainElement.removeChild(this);
      }
    }
  });
  
  // add the alert to the top of main
  const main = document.querySelector("main");
  if (main) {
    main.prepend(alert);
  }
  
  // make sure they see the alert by scrolling to the top of the window
  // you may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) {
    window.scrollTo(0, 0);
  }
}
