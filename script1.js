document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    let cart = [];

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        const groupedItems = cart.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});

        for (const category in groupedItems) {
            const categoryElement = document.createElement('div');
            categoryElement.classList.add('cart-category');
            categoryElement.innerHTML = `<h5>${category}</h5>`;
            cartItemsContainer.appendChild(categoryElement);

            groupedItems[category].forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <span>${item.name}</span>
                    <span>Qty: ${item.quantity}</span>
                    <span>Total: Php ${itemTotal}</span>
                    <button class="remove-item" data-name="${item.name}" data-category="${item.category}">Remove</button>
                `;
                categoryElement.appendChild(cartItemElement);
            });
        }

        totalPriceElement.textContent = `Php ${total}`;

        // Remove item functionality
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const name = event.target.getAttribute('data-name');
                const category = event.target.getAttribute('data-category');
                cart = cart.filter(item => !(item.name === name && item.category === category));
                updateCart();
            });
        });
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));
            const category = button.getAttribute('data-category');
            const quantityInput = button.previousElementSibling.querySelector('.quantity');
            const quantity = parseInt(quantityInput.value);

            const existingItem = cart.find(item => item.name === name && item.category === category);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ name, price, quantity, category });
            }

            updateCart();
        });
    });

    document.querySelectorAll('.minus, .plus').forEach(button => {
        button.addEventListener('click', (event) => {
            const quantityInput = event.target.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityInput.value);

            if (event.target.classList.contains('minus')) {
                quantity = Math.max(1, quantity - 1);
            } else if (event.target.classList.contains('plus')) {
                quantity = Math.min(15, quantity + 1);
            }

            quantityInput.value = quantity;
        });
    });
});


