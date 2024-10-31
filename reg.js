document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const errorMsg = document.getElementById('errorMsg');
    let currentStep = 0;

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value; // Добавлено поле имени
        const email = document.getElementById('email').value; 
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Проверка заполненности полей
        if (!username || !email || !password || !confirmPassword) {
            errorMsg.textContent = "Пожалуйста, заполните все поля!";
            return;
        }

        // Проверка совпадения паролей
        if (password !== confirmPassword) {
            errorMsg.textContent = "Пароли не совпадают!";
            return;
        }

        // Проверка существующего пользователя
        if (localStorage.getItem("userEmail") === email) {
            errorMsg.textContent = "Пользователь с таким email уже зарегистрирован!";
            return;
        }

        // Сохранение данных пользователя
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        localStorage.setItem("username", username); // Сохранение имени пользователя
        localStorage.setItem("registrationDate", new Date().toLocaleDateString()); // Сохранение даты регистрации
        localStorage.setItem("isAuthenticated", "true");
        errorMsg.textContent = "Регистрация прошла успешно!";

        // Очистка полей формы
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';

        // Перенаправление на главную страницу
        setTimeout(() => {
            window.location.href = "index.html"; // Перенаправляем на главную страницу
        }, 2000); 
    });

    document.getElementById('next1').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        if (!username || !email) {
            errorMsg.textContent = "Пожалуйста, введите имя и email!";
            return;
        }
        currentStep++; // Увеличиваем текущий шаг
        showStep(currentStep); // Показываем следующий шаг
        errorMsg.textContent = ""; 
    });

    document.getElementById('back1').addEventListener('click', () => {
        currentStep--;
        showStep(currentStep);
    });

    document.getElementById('next2').addEventListener('click', () => {
        const password = document.getElementById('password').value;
        if (password.length < 6) {
            errorMsg.textContent = "Пароль должен содержать не менее 6 символов!";
            return;
        }
        currentStep++;
        showStep(currentStep);
    });

    document.getElementById('back2').addEventListener('click', () => {
        currentStep--;
        showStep(currentStep);
    });
});
