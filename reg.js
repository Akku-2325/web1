document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const errorMsg = document.getElementById('errorMsg');
    let currentStep = 0;

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
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
        localStorage.setItem("username", username);
        localStorage.setItem("registrationDate", new Date().toLocaleDateString());
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
        errorMsg.textContent = ""; 
    });

    document.getElementById('back1').addEventListener('click', () => {
        currentStep--;
    });

    document.getElementById('next2').addEventListener('click', () => {
        const password = document.getElementById('password').value;
        if (password.length < 6) {
            errorMsg.textContent = "Пароль должен содержать не менее 6 символов!";
            return;
        }
        currentStep++;
    });

    document.getElementById('back2').addEventListener('click', () => {
        currentStep--;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const errorMsg = document.getElementById('errorMsg');
    let currentStep = 0;

    // Функция для отображения текущего шага
    function showStep(step) {
        const steps = document.querySelectorAll('.step');
        steps.forEach((s, index) => {
            s.style.display = (index === step) ? 'block' : 'none'; // Показать текущий шаг, скрыть остальные
        });
    }

    // Показать первый шаг при загрузке страницы
    showStep(currentStep);

    // Обработчик отправки формы
    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
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
        localStorage.setItem("username", username);
        localStorage.setItem("registrationDate", new Date().toLocaleDateString());
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

    // Обработчик для кнопки "Следующий шаг" на первом шаге
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

    // Обработчик для кнопки "Назад" на первом шаге
    document.getElementById('back1').addEventListener('click', () => {
        currentStep--; // Уменьшаем текущий шаг
        showStep(currentStep); // Показываем предыдущий шаг
    });

    // Обработчик для кнопки "Следующий шаг" на втором шаге
    document.getElementById('next2').addEventListener('click', () => {
        const password = document.getElementById('password').value;
        if (password.length < 6) {
            errorMsg.textContent = "Пароль должен содержать не менее 6 символов!";
            return;
        }
        currentStep++; // Увеличиваем текущий шаг
        showStep(currentStep); // Показываем следующий шаг
    });

    // Обработчик для кнопки "Назад" на втором шаге
    document.getElementById('back2').addEventListener('click', () => {
        currentStep--; // Уменьшаем текущий шаг
        showStep(currentStep); // Показываем предыдущий шаг
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const errorMsg = document.getElementById('errorMsg');

    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');

    const next1Button = document.getElementById('next1');
    const next2Button = document.getElementById('next2');
    const back1Button = document.getElementById('back1');
    const back2Button = document.getElementById('back2');

    // Шаги
    next1Button.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;

        if (!username || !email) {
            errorMsg.textContent = "Пожалуйста, заполните все поля.";
            return;
        }

        localStorage.setItem('username', username);
        localStorage.setItem('userEmail', email);
        
        step1.style.display = 'none';
        step2.style.display = 'block';
        errorMsg.textContent = '';
    });

    back1Button.addEventListener('click', () => {
        step2.style.display = 'none';
        step1.style.display = 'block';
    });

    next2Button.addEventListener('click', () => {
        const password = document.getElementById('password').value;

        if (password.length < 6) {
            errorMsg.textContent = "Пароль должен содержать минимум 6 символов.";
            return;
        }

        localStorage.setItem('userPassword', password);

        step2.style.display = 'none';
        step3.style.display = 'block';
        errorMsg.textContent = '';
    });

    back2Button.addEventListener('click', () => {
        step3.style.display = 'none';
        step2.style.display = 'block';
    });

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const confirmPassword = document.getElementById('confirmPassword').value;
        const password = document.getElementById('password').value;

        if (password !== confirmPassword) {
            errorMsg.textContent = "Пароли не совпадают.";
            return;
        }

        // Сохранение данных в localStorage
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('userEmail');
        const passwordSaved = localStorage.getItem('userPassword');

        if (username && email && passwordSaved) {
            // Сохранение данных в localStorage завершено
            alert('Вы успешно зарегистрировались!');
            window.location.href = 'login.html';  // Перенаправление на страницу входа
        } else {
            errorMsg.textContent = "Произошла ошибка при регистрации.";
        }
    });
});