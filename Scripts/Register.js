document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();

    let submitButton = document.getElementById("submit");

    function validateEmail(email) {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        if (password.length < 8) {
            return false;
        }

        return true;
    }

    function checkUserExists(email) {
        let users = JSON.parse(localStorage.getItem("users"));
        let isUserExists = users.find(u => u.email == email);
        return isUserExists;
    }
    function showMessage(type, text) {

        let box = document.getElementById("messageBox");
        let icon = document.getElementById("messageIcon");
        let message = document.getElementById("messageText");

        box.classList.remove("success", "error");
        box.classList.add(type);
        box.classList.add("show");

        if (type === "success") {
            icon.innerHTML = "✅";
        } else {
            icon.innerHTML = "❌";
        }

        message.textContent = text;

        setTimeout(() => {
            box.classList.remove("show");
        }, 3000);
    }
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirm-password").value;
        if (name === "") {
            showMessage("error", "Name is not valid");
        }
        else if (!validateEmail(email)) {
            showMessage("error", "Email is not valid");
        }
        else if (!validatePassword(password)) {
            showMessage("error", "Password must be at least 8 characters");
        }
        else if (password !== confirmPassword) {
            showMessage("error", "Passwords do not match");
        }
        else {
            if (checkUserExists(email)) {
                showMessage("error", "User already exists");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];

            let user = new User(name, email, password);

            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));

            showMessage("success", "Registration done successfully");

            setTimeout(() => {
                window.location.href = "../Pages/Login.html";
            }, 1500);
        }
    });
});