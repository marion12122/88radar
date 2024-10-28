document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        let product = this.closest('.product');
        let productName = product.querySelector('h2').textContent;
        let productPrice = parseFloat(product.querySelector('.price').textContent.replace('₱', ''));
        let quantity = parseInt(product.querySelector('.quantity-input').value);
        
        if (isNaN(quantity) || quantity <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }
        
        addToCart(productName, productPrice, quantity);
    });
});

// Select all products
const products = document.querySelectorAll('.product');

products.forEach((product) => {
    const stars = product.querySelectorAll('.star');
    const ratingValueDisplay = product.querySelector('.rating-value');
    const ratingText = product.querySelector('.rating-text');
    let rating = 0;

    stars.forEach((star) => {
        star.addEventListener('mouseover', () => {
            highlightStars(star.getAttribute('data-value'), stars);
        });

        star.addEventListener('mouseout', () => {
            highlightStars(rating, stars);
        });

        star.addEventListener('click', () => {
            rating = star.getAttribute('data-value');
            ratingText.innerText = rating;
            ratingValueDisplay.style.display = "block";
        });
    });

    function highlightStars(value, stars) {
        stars.forEach((star) => {
            star.classList.remove('hovered', 'selected');
            if (star.getAttribute('data-value') <= value) {
                star.classList.add(value == rating ? 'selected' : 'hovered');
            }
        });
    }
});



let cartItems = [];

function addToCart(name, price, quantity) {
    let cartItem = cartItems.find(item => item.name === name);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cartItems.push({ name, price, quantity });
    }
    updateCart();
}

function updateCart() {
    let cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    cartItems.forEach((item, index) => {
        let itemTotalPrice = item.price * item.quantity;
        totalPrice += itemTotalPrice;
        let cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <input type="checkbox" class="cart-item-checkbox" data-index="${index}">
            <span>${item.name}</span>
            <button class="quantity-button" data-index="${index}" data-action="subtract">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-button" data-index="${index}" data-action="add">+</button>
            <span>₱${itemTotalPrice.toFixed(2)}</span>`;
        cartItemsContainer.appendChild(cartItemDiv);
    });
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}


document.addEventListener('click', function(e) {
    if (e.target.classList.contains('quantity-button')) {
        let index = e.target.dataset.index;
        let action = e.target.dataset.action;

        if (action === 'add') {
            cartItems[index].quantity += 1;
        } else if (action === 'subtract') {
            cartItems[index].quantity = Math.max(cartItems[index].quantity - 1, 0);
            if (cartItems[index].quantity === 0) {
                cartItems.splice(index, 1);
            }
        }
        updateCart();
    }
});


document.getElementById('select-all').addEventListener('click', () => {
    document.querySelectorAll('.cart-item-checkbox').forEach(checkbox => {
        checkbox.checked = true;
    });
});

document.getElementById('deselect-all').addEventListener('click', () => {
    document.querySelectorAll('.cart-item-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
});
