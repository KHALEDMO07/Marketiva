document.addEventListener("DOMContentLoaded", () => {
    const currentUser = getCurrentUser();
    let selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    if (selectedProduct) {
        selectedProduct = new Product(
            selectedProduct.id,
            selectedProduct.name,
            selectedProduct.category,
            selectedProduct.price,
            selectedProduct.image,
            selectedProduct.description
        );
    }

    if (!selectedProduct) {
        window.location.href = "index.html";
        return;
    }

    updateNavbar();

    // Display Product Details
    const productContent = document.getElementById("product-content");
    productContent.innerHTML = "";

    const imgDiv = document.createElement("div");
    imgDiv.className = "product-image-large";
    const img = document.createElement("img");
    img.src = selectedProduct.image;
    img.alt = selectedProduct.name;
    imgDiv.appendChild(img);

    const infoDiv = document.createElement("div");
    infoDiv.className = "product-info-details";

    const category = document.createElement("span");
    category.className = "category-badge";
    category.textContent = selectedProduct.category;

    const title = document.createElement("h1");
    title.className = "product-title";
    title.textContent = selectedProduct.name;

    const price = document.createElement("p");
    price.className = "product-price-large";
    price.textContent = `$${selectedProduct.price.toFixed(2)}`;

    const desc = document.createElement("p");
    desc.className = "product-description";
    desc.textContent = selectedProduct.description;

    const btn = document.createElement("button");
    btn.className = "add-to-cart-btn";
    btn.id = "add-to-cart-btn";
    btn.title = "Add To The Cart";
    const cartIcon = document.createElement("i");
    cartIcon.className = "fas fa-shopping-cart";
    btn.appendChild(cartIcon);
    btn.appendChild(document.createTextNode(" Add To Cart"));

    infoDiv.appendChild(category);
    infoDiv.appendChild(title);
    infoDiv.appendChild(price);
    infoDiv.appendChild(desc);
    infoDiv.appendChild(btn);

    productContent.appendChild(imgDiv);
    productContent.appendChild(infoDiv);

    // Add To Cart Logic
    const addToCartBtn = document.getElementById("add-to-cart-btn");
    const cartCount = document.getElementById("cart-count");
    const toast = document.getElementById("toast");



    addToCartBtn.addEventListener("click", () => {
        if (!currentUser) {
            alert("Please login to add items to the cart.");
            window.location.href = "Login.html";
            return;
        }
        const cartKey = `cart_${currentUser.email}`;
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const existingItem = cart.find(item => item.id === selectedProduct.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...selectedProduct, quantity: 1 });
        }

        localStorage.setItem(cartKey, JSON.stringify(cart));
        updateCartIcon();

        toast.style.display = "block";
        toast.textContent = "Product added to cart!";
        toast.style.background = "#28a745";
        setTimeout(() => {
            toast.style.display = "none";
        }, 3000);
    });

    updateCartUI();
});
