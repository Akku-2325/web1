document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const loginErrorMsg = document.getElementById('loginErrorMsg');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Проверка корректности ввода
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            localStorage.setItem("isAuthenticated", "true");
            window.location.href = "index.html"; // Перенаправление на главную страницу
        } else {
            loginErrorMsg.textContent = "Неверный email или пароль!";
        }
    });
});
