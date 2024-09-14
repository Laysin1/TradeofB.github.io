document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.menu-item');
    const products = document.querySelectorAll('.product');

    // Show Home section by default
    showCategory("home");

    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            showCategory(category);
        });
    });

    function showCategory(category) {
        const homeSection = document.getElementById('home');
        const productsSection = document.getElementById('products');

        if (category === 'home') {
            homeSection.style.display = 'block';
            productsSection.style.display = 'none';
        } else {
            homeSection.style.display = 'none';
            productsSection.style.display = 'block';

            products.forEach(product => {
                if (product.getAttribute('data-category') === category) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }
    }
});


// Search functionality
const searchBox = document.getElementById("search-box");
searchBox.addEventListener("keyup", function () {
    const searchValue = searchBox.value.toLowerCase();
    const products = document.querySelectorAll(".product");
    products.forEach(product => {
        const productName = product.textContent.toLowerCase();
        if (productName.includes(searchValue)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});

// Sorting functionality
const sortAscBtn = document.getElementById("sort-asc");
const sortDescBtn = document.getElementById("sort-desc");

sortAscBtn.addEventListener("click", function () {
    sortProducts("asc");
});

sortDescBtn.addEventListener("click", function () {
    sortProducts("desc");
});

function sortProducts(order) {
    const products = document.querySelectorAll(".product");
    const productsArray = Array.from(products);
    productsArray.sort((a, b) => {
        const priceA = parseFloat(a.querySelector("span").textContent.substring(1));
        const priceB = parseFloat(b.querySelector("span").textContent.substring(1));
        return order === "asc" ? priceA - priceB : priceB - priceA;
    });
    const productsContainer = document.querySelector(".products");
    productsArray.forEach(product => {
        productsContainer.appendChild(product);
    });
}

// Cart functionality
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
let cartTotal = 0;

const addToCartButtons = document.querySelectorAll(".product");
addToCartButtons.forEach(button => {
    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    button.appendChild(addToCartBtn);

    addToCartBtn.addEventListener("click", function () {
        const productName = button.querySelector("p").textContent;
        const productPrice = parseFloat(button.querySelector("span").textContent.substring(1));
        const productImage = button.querySelector("img").src; // Get the image source
        addToCart(productName, productPrice, productImage); // Pass the image source to the cart
    });
});

function addToCart(name, price) {
    const cartItem = document.createElement("div");
    cartItem.textContent = `${name} - $${price}`;
    cartItemsContainer.appendChild(cartItem);
    cartTotal += price;
    cartTotalElement.textContent = cartTotal.toFixed(2);
}

// Update the cart count display when an item is added
const cartCountElement = document.getElementById("cart-count");
let cartCount = 0;

function addToCart(name, price) {
    const cartItem = document.createElement("div");
    cartItem.textContent = `${name} - $${price}`;

    // Create a "Remove" button for the cart item
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.style.marginLeft = "10px";
    cartItem.appendChild(removeBtn);

    // Append the cart item to the cart
    cartItemsContainer.appendChild(cartItem);

    // Update the total price
    cartTotal += price;
    cartTotalElement.textContent = cartTotal.toFixed(2);

    // Increment the cart count and update the display
    cartCount++;
    cartCountElement.textContent = cartCount;

    // Event listener for the "Remove" button
    removeBtn.addEventListener("click", function () {
        cartItem.remove(); // Remove the item from the cart
        cartTotal -= price; // Subtract the price from the total
        cartTotalElement.textContent = cartTotal.toFixed(2); // Update the total display

        // Decrease the cart count and update the display
        cartCount--;
        cartCountElement.textContent = cartCount;
    });
}

// Sidebar Cart Functionality
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.querySelector(".cart-overlay");
const cartIcon = document.getElementById("cart-icon");

cartIcon.addEventListener("click", function() {
    cartSidebar.classList.add("open");
    cartOverlay.classList.add("open");
});

cartOverlay.addEventListener("click", function() {
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("open");
});

// Update Cart with Product Images and Quantity Controls
function addToCart(name, price, imageSrc) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
        <img src="${imageSrc}" alt="${name}">
        <div class="cart-item-details">
            <p>${name}</p>
            <span>$${price}</span>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease">-</button>
                <span class="quantity">1</span>
                <button class="quantity-btn increase">+</button>
            </div>
        </div>
        <button class="remove-item">Remove</button>
    `;

    // Append to cart items
    cartItemsContainer.appendChild(cartItem);
    
    // Update Total
    cartTotal += price;
    cartTotalElement.textContent = cartTotal.toFixed(2);
    
    // Update Cart Count
    cartCount++;
    cartCountElement.textContent = cartCount;
    
    // Quantity control functionality
    const quantityElement = cartItem.querySelector(".quantity");
    const increaseBtn = cartItem.querySelector(".increase");
    const decreaseBtn = cartItem.querySelector(".decrease");

    increaseBtn.addEventListener("click", function() {
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
        cartTotal += price;
        cartTotalElement.textContent = cartTotal.toFixed(2);
    });

    decreaseBtn.addEventListener("click", function() {
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
            cartTotal -= price;
            cartTotalElement.textContent = cartTotal.toFixed(2);
        }
    });

    // Remove item functionality
    const removeBtn = cartItem.querySelector(".remove-item");
    removeBtn.addEventListener("click", function() {
        cartItem.remove();
        cartTotal -= price * parseInt(quantityElement.textContent);
        cartTotalElement.textContent = cartTotal.toFixed(2);
        cartCount--;
        cartCountElement.textContent = cartCount;
    });
}

