document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "Login.html";
        return;
    }

    const cartKey = `cart_${currentUser.email}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const cartItemsList = document.getElementById("cart-items-list");
    const subtotalEl = document.getElementById("subtotal-price");
    const totalEl = document.getElementById("total-price");
    const cartCountEl = document.getElementById("cart-count");
    const buyNowBtn = document.getElementById("buy-now-btn");
    const successOverlay = document.getElementById("order-success-overlay");

    updateNavbar();

    function renderCart() {
        cartItemsList.innerHTML = "";

        if (cart.length === 0) {
            const emptyMsg = document.createElement("div");
            emptyMsg.className = "empty-cart-message";

            const icon = document.createElement("i");
            icon.className = "fas fa-shopping-basket";

            const p = document.createElement("p");
            p.textContent = "Your cart is empty.";

            emptyMsg.appendChild(icon);
            emptyMsg.appendChild(p);
            cartItemsList.appendChild(emptyMsg);

            buyNowBtn.disabled = true;
            buyNowBtn.style.opacity = "0.5";
            buyNowBtn.style.cursor = "not-allowed";
        } else {
            buyNowBtn.disabled = false;
            buyNowBtn.style.opacity = "1";
            buyNowBtn.style.cursor = "pointer";

            cart.forEach((item, index) => {
                const cartItem = document.createElement("div");
                cartItem.className = "cart-item";

                const img = document.createElement("img");
                img.src = item.image;
                img.alt = item.name;

                const info = document.createElement("div");
                info.className = "cart-item-info";

                const title = document.createElement("h4");
                title.textContent = item.name;

                const category = document.createElement("p");
                category.textContent = item.category;

                const removeBtn = document.createElement("button");
                removeBtn.className = "remove-btn";
                removeBtn.innerHTML = '<i class="fas fa-trash"></i> Remove';
                removeBtn.onclick = () => removeItem(index);

                info.appendChild(title);
                info.appendChild(category);
                info.appendChild(removeBtn);

                const controls = document.createElement("div");
                controls.className = "quantity-controls";

                const minusBtn = document.createElement("button");
                minusBtn.className = "qty-btn";
                minusBtn.innerHTML = '<i class="fas fa-minus"></i>';
                minusBtn.onclick = () => updateQuantity(index, item.quantity - 1);

                const qtyDisplay = document.createElement("span");
                qtyDisplay.className = "qty-count";
                qtyDisplay.textContent = item.quantity;

                const plusBtn = document.createElement("button");
                plusBtn.className = "qty-btn";
                plusBtn.innerHTML = '<i class="fas fa-plus"></i>';
                plusBtn.onclick = () => updateQuantity(index, item.quantity + 1);

                controls.appendChild(minusBtn);
                controls.appendChild(qtyDisplay);
                controls.appendChild(plusBtn);

                const price = document.createElement("div");
                price.className = "cart-item-price";
                price.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

                cartItem.appendChild(img);
                cartItem.appendChild(info);
                cartItem.appendChild(controls);
                cartItem.appendChild(price);

                cartItemsList.appendChild(cartItem);
            });
        }

        updateTotals();
    }

    function updateQuantity(index, newQty) {
        if (newQty < 1) return;
        cart[index].quantity = newQty;
        localStorage.setItem(cartKey, JSON.stringify(cart));
        renderCart();
    }

    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem(cartKey, JSON.stringify(cart));
        renderCart();
    }

    function updateTotals() {
        const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        totalEl.textContent = `$${subtotal.toFixed(2)}`;

        const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
        updateCartIcon();
    }

    buyNowBtn.addEventListener("click", () => {
        if (cart.length === 0) return;


        successOverlay.style.display = "flex";


        cart = [];
        localStorage.setItem(cartKey, JSON.stringify(cart));

        updateTotals();
    });

    updateNavbar();
    renderCart();
});
