document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("inputname");
    const passwordInput = document.getElementById("inputpass");
    const showPasswordToggle = document.getElementById("showPasswordToggle");
    const rememberMeCheckbox = document.getElementById("rememberMe");

    // Animate form entrance
    form.classList.add("fade-in");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission for validation

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (validateEmail(email) && validatePassword(password)) {
            alert("Form submitted successfully!");

            if (rememberMeCheckbox.checked) {
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
            } else {
                localStorage.removeItem("email");
                localStorage.removeItem("password");
            }

            // Redirect to home page or perform login logic here
            window.location.href = "./index.html";
        }
    });

    showPasswordToggle.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            showPasswordToggle.innerText = "Hide Password";
        } else {
            passwordInput.type = "password";
            showPasswordToggle.innerText = "Show Password";
        }
    });

    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            displayError(emailInput, "Please enter a valid email address.");
            return false;
        }
        clearError(emailInput);
        return true;
    }

    function validatePassword(password) {
        if (password.length < 6) {
            displayError(passwordInput, "Password must be at least 6 characters long.");
            return false;
        }
        clearError(passwordInput);
        return true;
    }

    function displayError(inputElement, message) {
        const errorElement = inputElement.nextElementSibling;
        errorElement.innerText = message;
        errorElement.style.display = "block";
        inputElement.classList.add("input-error");
    }

    function clearError(inputElement) {
        const errorElement = inputElement.nextElementSibling;
        errorElement.innerText = "";
        errorElement.style.display = "none";
        inputElement.classList.remove("input-error");
    }

    // Pre-fill the form if 'Remember Me' was checked
    if (localStorage.getItem("email") && localStorage.getItem("password")) {
        emailInput.value = localStorage.getItem("email");
        passwordInput.value = localStorage.getItem("password");
        rememberMeCheckbox.checked = true;
    }
});
