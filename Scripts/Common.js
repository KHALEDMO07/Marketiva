/**
 * Common.js - Shared functions 
 */

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function updateNavbar() {
    const authLinks = document.getElementById("auth-links");
    if (!authLinks) return;

    const currentUser = getCurrentUser();
    authLinks.innerHTML = "";

    if (currentUser) {
        // User is logged in
        const userLi = document.createElement("li");
        userLi.id = "user-display";
        userLi.style.marginRight = "1rem";
        userLi.innerHTML = `<i class="fas fa-user"></i> <span>${currentUser.name || currentUser.username}</span>`;

        const logoutLi = document.createElement("li");
        const logoutBtn = document.createElement("a");
        logoutBtn.href = "#";
        logoutBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout`;
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("currentUser");
            location.reload();
        });
        logoutLi.appendChild(logoutBtn);

        authLinks.appendChild(userLi);
        authLinks.appendChild(logoutLi);
    } else {
        // No user logged in
        const loginLi = document.createElement("li");
        const loginBtn = document.createElement("a");
        loginBtn.href = "Login.html";
        loginBtn.textContent = "Login";
        loginLi.appendChild(loginBtn);

        const registerLi = document.createElement("li");
        const registerBtn = document.createElement("a");
        registerBtn.href = "Register.html";
        registerBtn.className = "auth-btn primary";
        registerBtn.textContent = "Register";
        registerLi.appendChild(registerBtn);

        authLinks.appendChild(loginLi);
        authLinks.appendChild(registerLi);
    }

    // Update Active State
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (linkPath === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Update Cart Count
    updateCartIcon();
}

function updateCartIcon() {
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;

    const currentUser = getCurrentUser();
    if (!currentUser) {
        cartCount.textContent = "0";
        return;
    }

    const cartKey = `cart_${currentUser.email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}
