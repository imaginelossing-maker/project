
const products = [
  {
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
    image: "./assets/images/image-waffle-desktop.jpg"
  },
  {
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7,
    image: "./assets/images/image-creme-brulee-desktop.jpg"
  },
  {
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8,
    image: "./assets/images/image-macaron-desktop.jpg"
  },
  {
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
    image: "./assets/images/image-tiramisu-desktop.jpg"
  },
  {
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4,
    image: "./assets/images/image-baklava-desktop.jpg"
  },
  {
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5,
    image: "./assets/images/image-meringue-desktop.jpg"
  }
];

const productsGrid = document.getElementById("productsGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const emptyCart = document.getElementById("emptyCart");
const cartTotalContainer = document.getElementById("cartTotalContainer");

let cart = [];

function renderProducts() {
  productsGrid.innerHTML = "";

  products.forEach((product, index) => {

    const cartItem = cart.find(item => item.name === product.name);
    const quantity = cartItem ? cartItem.quantity : 0;

    const card = document.createElement("div");
    card.classList.add("product-card");

    if(quantity > 0){
      card.classList.add("active");
    }

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">

        ${
          quantity === 0
          ?
          `
          <button class="add-btn" onclick="addToCart(${index})">
            <img src="./assets/images/icon-add-to-cart.svg">
            Add to Cart
          </button>
          `
          :
          `
          <div class="quantity-box">
            <div class="quantity-btn" onclick="decreaseQty(${index})">-</div>
            <span>${quantity}</span>
            <div class="quantity-btn" onclick="increaseQty(${index})">+</div>
          </div>
          `
        }
      </div>

      <div class="product-info">
        <p class="category">${product.category}</p>
        <h3 class="name">${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

function addToCart(index){
  const product = products[index];

  const existing = cart.find(item => item.name === product.name);

  if(existing){
    existing.quantity++;
  } else {
    cart.push({...product, quantity:1});
  }

  updateCart();
}

function increaseQty(index){
  addToCart(index);
}

function decreaseQty(index){
  const product = products[index];

  const existing = cart.find(item => item.name === product.name);

  if(existing.quantity > 1){
    existing.quantity--;
  } else {
    cart = cart.filter(item => item.name !== product.name);
  }

  updateCart();
}

function removeItem(name){
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

function updateCart(){

  renderProducts();

  cartItems.innerHTML = "";

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCount.textContent = totalItems;

  if(cart.length === 0){
    emptyCart.classList.remove("hidden");
    cartTotalContainer.classList.add("hidden");
  } else {
    emptyCart.classList.add("hidden");
    cartTotalContainer.classList.remove("hidden");
  }

  let total = 0;

  cart.forEach(item => {

    total += item.quantity * item.price;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <div>
        <h4>${item.name}</h4>

        <div class="cart-meta">
          <span class="qty">${item.quantity}x</span>
          <span class="single-price">@ $${item.price.toFixed(2)}</span>
          <span class="total-price">$${(item.quantity * item.price).toFixed(2)}</span>
        </div>
      </div>

      <div class="remove-btn" onclick="removeItem('${item.name}')">
        x
      </div>
    `;

    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

renderProducts();
