document.addEventListener("DOMContentLoaded", function () {
  let products = [
    { ID: 1, name: "Product 1", price: 49.99 },
    { ID: 2, name: "Product 2", price: 19.99 },
    { ID: 3, name: "Product 3", price: 79.99 },
  ];

  let cart = [];

  const productList = document.getElementById("product-list");
  const checkoutBtn = document.getElementById("checkout-btn");
  const cartItemsDisplay = document.getElementById("cart-items");
  const emptyCartText = document.getElementById("empty-cart");
  const cartTotalDiv = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");

  //Dispaly products
  products.forEach((item) => {
    let div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
        <span> ${item.name} - $${item.price.toFixed(2)} </span>
        <button id="${item.ID}"> Add to Cart </button>
    `;
    productList.appendChild(div);
  });

  //Add to cart
  productList.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      let productID = parseInt(e.target.getAttribute("id"));
      let product = products.find((item) => item.ID === productID);
      cart.push(product);
      displayCart();
    }
  });

  function displayCart() {
    let totalAmt = 0;
    cartItemsDisplay.innerHTML = "";
    if (cart.length > 0) {
      cart.forEach((item) => {
        let p = document.createElement("p");
        p.textContent = `${item.name} - ${item.price}`;
        cartItemsDisplay.appendChild(p);
        totalAmt += item.price;
      });
    } else {
      emptyCartText.classList.remove("hidden");
    }
    cartTotalDiv.classList.remove("hidden");
    totalPriceDisplay.textContent = totalAmt.toFixed(2);
  }

  checkoutBtn.addEventListener("click", function(){
      cart.length = 0;
      displayCart();
      alert("Successfully checkedout");
  })
});
