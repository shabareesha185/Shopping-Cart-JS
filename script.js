document.addEventListener("DOMContentLoaded", function () {
  let products = [
    { ID: 1, name: "Product 1", price: 49.99 },
    { ID: 2, name: "Product 2", price: 19.99 },
    { ID: 3, name: "Product 3", price: 79.99 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const checkoutBtn = document.getElementById("checkout-btn");
  const cartItemsDisplay = document.getElementById("cart-items");
  const emptyCartText = document.getElementById("empty-cart");
  const cartTotalDiv = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");

  //Display products
  products.forEach((item) => {
    let div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
        <span> ${item.name} - $${item.price.toFixed(2)} </span>
        <button data-id="${item.ID}"> Add to Cart </button>
    `;
    productList.appendChild(div);
  });

  // Display cart items on page load
  displayCart();

  //Add to cart
  productList.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      let productID = parseInt(e.target.dataset.id);
      let product = products.find((item) => item.ID === productID);
      cart.push(product);
      displayCart();
      addCartToLS();
    }
  });

  //Checkout button
  checkoutBtn.addEventListener("click", function () {
    cart.length = 0;
    displayCart();
    addCartToLS();
    alert("Successfully checked out");
  });

  function displayCart() {
    let totalAmt = 0;
    if (cart.length > 0) {
      emptyCartText.classList.add("hidden");
      cart.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
        <p>${item.name} - $${item.price.toFixed(2)}</p>
        <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        cartItemsDisplay.appendChild(div);
        totalAmt += item.price;
      });
    } else {
      emptyCartText.classList.remove("hidden");
    }
    cartTotalDiv.classList.remove("hidden");
    totalPriceDisplay.textContent = totalAmt.toFixed(2);
  }

  function addCartToLS() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Use event delegation on the cart container
  cartItemsDisplay.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const indexToDelete = parseInt(e.target.dataset.index);

      // Remove item from the cart array using its index
      cart.splice(indexToDelete, 1);

      // Update cart display and local storage
      displayCart();
      addCartToLS();
    }
  });
});
