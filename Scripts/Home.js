document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();

    const initialProducts = [
        // Clothes
        new Product(1, "Premium Hoodie", "Clothes", 59.99, "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80", "A high-quality cotton hoodie for everyday comfort."),
        new Product(4, "Designer Jeans", "Clothes", 89.99, "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80", "Stylish and durable designer jeans."),
        new Product(7, "Summer Dress", "Clothes", 45.00, "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80", "Light and airy dress perfect for summer days."),
        new Product(10, "Leather Jacket", "Clothes", 199.99, "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80", "Classic leather jacket for a bold look."),
        new Product(11, "Wool Sweater", "Clothes", 65.00, "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80", "Warm and comfortable wool sweater."),
        new Product(12, "Silk Shirt", "Clothes", 75.00, "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?auto=format&fit=crop&w=800&q=80", "Elegant silk shirt for formal occasions."),

        // PCs
        new Product(5, "Gaming Desktop", "PCs", 1499.99, "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80", "High-performance gaming desktop with RGB lighting."),
        new Product(8, "Ultra Laptop", "PCs", 1299.00, "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80", "Slim and powerful laptop for professionals on the go."),


        // Phones
        new Product(3, "iPhone 14 Pro", "Phones", 999.99, "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&w=800&q=80", "The latest iPhone with professional camera features."),
        new Product(6, "Samsung Galaxy S23", "Phones", 799.99, "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=800&q=80", "Powerful Android smartphone with a stunning display."),
        new Product(9, "Pixel 7 Pro", "Phones", 699.00, "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80", "Google's flagship phone with an amazing camera."),
        new Product(16, "OnePlus 11", "Phones", 649.99, "https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&w=800&q=80", "Fast and smooth performance with Hasselblad camera."),
        new Product(17, "Sony Xperia 5 IV", "Phones", 899.00, "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80", "Compact power for creators."),
        new Product(18, "ASUS Zenfone 9", "Phones", 599.00, "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80", "The best small phone with big performance.")
    ];

    const CURRENT_CATALOG_VERSION = 5;
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    const storedVersion = localStorage.getItem("catalog_version");

    if (!storedProducts || storedProducts.length !== initialProducts.length || storedVersion != CURRENT_CATALOG_VERSION) {
        localStorage.setItem("products", JSON.stringify(initialProducts));
        localStorage.setItem("catalog_version", CURRENT_CATALOG_VERSION);
    }

    const allProducts = JSON.parse(localStorage.getItem("products"));

    const sliderContainer = document.getElementById("slides-container");
    const dotsContainer = document.getElementById("dots-container");
    const sliderItems = [
        { title: "New Season Arrived", subtitle: "Check out our latest clothes collection", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
        { title: "Next-Gen Computing", subtitle: "Explore our powerful range of PCs", image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80" },
        { title: "Tech Revolution", subtitle: "Get the latest smartphones today", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
    ];

    let currentSlide = 0;

    function initSlider() {
        sliderItems.forEach((item, index) => {
            const slide = document.createElement("div");
            slide.className = "slide";

            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.title;

            const content = document.createElement("div");
            content.className = "slide-content";

            const h2 = document.createElement("h2");
            h2.textContent = item.title;

            const p = document.createElement("p");
            p.textContent = item.subtitle;

            content.appendChild(h2);
            content.appendChild(p);
            slide.appendChild(img);
            slide.appendChild(content);
            sliderContainer.appendChild(slide);

            const dot = document.createElement("div");
            dot.className = index === 0 ? "dot active" : "dot";
            dot.addEventListener("click", () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        if (currentSlide >= sliderItems.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = sliderItems.length - 1;

        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

        document.querySelectorAll(".dot").forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentSlide);
        });
    }

    document.getElementById("next-slide").addEventListener("click", () => goToSlide(currentSlide + 1));
    document.getElementById("prev-slide").addEventListener("click", () => goToSlide(currentSlide - 1));

    setInterval(() => goToSlide(currentSlide + 1), 5000);

    initSlider();

    const productList = document.getElementById("product-list");
    const filterButtons = document.querySelectorAll(".filter-btn");

    function renderProducts(filter = "All") {
        productList.innerHTML = "";
        const filtered = filter === "All" ? allProducts : allProducts.filter(p => p.category === filter);

        filtered.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            const imgDiv = document.createElement("div");
            imgDiv.className = "product-image";
            const img = document.createElement("img");
            img.src = product.image;
            img.alt = product.name;
            imgDiv.appendChild(img);

            const infoDiv = document.createElement("div");
            infoDiv.className = "product-info";

            const category = document.createElement("p");
            category.className = "product-category";
            category.textContent = product.category;

            const name = document.createElement("h3");
            name.className = "product-name";
            name.textContent = product.name;

            const price = document.createElement("p");
            price.className = "product-price";
            price.textContent = `$${product.price.toFixed(2)}`;

            infoDiv.appendChild(category);
            infoDiv.appendChild(name);
            infoDiv.appendChild(price);

            const hint = document.createElement("div");
            hint.className = "add-to-cart-hint";
            hint.title = "Add To The Cart";
            const icon = document.createElement("i");
            icon.className = "fas fa-plus";
            hint.appendChild(icon);

            card.appendChild(imgDiv);
            card.appendChild(infoDiv);
            card.appendChild(hint);

            card.addEventListener("click", () => {
                localStorage.setItem("selectedProduct", JSON.stringify(product));
                window.location.href = "ProductDetails.html";
            });
            productList.appendChild(card);
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderProducts(btn.dataset.filter);
        });
    });

    renderProducts();

    updateCartIcon();
});
