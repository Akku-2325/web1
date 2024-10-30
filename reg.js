document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const errorMsg = document.getElementById('errorMsg');
    let currentStep = 0;

    const clickSound = new Audio('69880c1f5e57698.mp3');

    function playClickSound() {
        if (!clickSound.paused) {
            clickSound.pause();
            clickSound.currentTime = 0; 
        }
        clickSound.play();
    }

    function showStep(step) {
        const steps = document.querySelectorAll('.step');
        steps.forEach((s, index) => {
            s.style.display = (index === step) ? 'block' : 'none'; // Показать текущий шаг, скрыть остальные
        });
    }

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value; 
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Проверка заполненности полей
        if (!email || !password || !confirmPassword) {
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
        playClickSound();
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        localStorage.setItem("isAuthenticated", "true");
        errorMsg.textContent = "Регистрация прошла успешно!";

        // Очистка полей формы
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';

        // Перенаправление на главную страницу
        setTimeout(() => {
            window.location.href = "index.html"; // Перенаправляем на главную страницу
        }, 2000); 
    });

    document.getElementById('next1').addEventListener('click', () => {
        const email = document.getElementById('email').value;
        if (!email) {
            errorMsg.textContent = "Пожалуйста, введите email!";
            return;
        }
        playClickSound();
        currentStep++; // Увеличиваем текущий шаг
        showStep(currentStep); // Показываем следующий шаг
        errorMsg.textContent = ""; 
    });

    document.getElementById('back1').addEventListener('click', () => {
        playClickSound(); 
        currentStep--;
        showStep(currentStep);
    });

    document.getElementById('next2').addEventListener('click', () => {
        const password = document.getElementById('password').value;
        if (password.length < 6) {
            errorMsg.textContent = "Пароль должен содержать не менее 6 символов!";
            return;
        }
        playClickSound(); 
        currentStep++;
        showStep(currentStep);
    });

    document.getElementById('back2').addEventListener('click', () => {
        playClickSound(); 
        currentStep--;
        showStep(currentStep);
    });
});
