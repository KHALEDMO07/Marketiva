document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();

    let submitButton = document.getElementById("submit");
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
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(u => u.email == email && u.password == password);
        if (user) {
            user = new User(user.name, user.email, user.password);
            localStorage.setItem("currentUser", JSON.stringify(user));
            showMessage("success", "Login Successfully");
            setTimeout(() => {
                window.location.href = "../Pages/Home.html";
            }, 1500);
        } else {
            showMessage("error", "Invalid Email or Password");
        }
    });
});