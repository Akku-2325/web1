document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Функция для установки темы
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            themeIcon.innerHTML = '&#9790;'; // Иконка для луны
        } else {
            document.body.classList.remove('dark-theme');
            themeIcon.innerHTML = '&#9728;'; // Иконка для солнца
        }
        localStorage.setItem('theme', theme); 
    }

    // Загрузка темы при загрузке страницы
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', function () {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('button'); 
    let currentIndex = 0;

    if (buttons.length > 0) {
        buttons[currentIndex].focus();
    }


    document.addEventListener('keydown', function (event) {
        const totalButtons = buttons.length;

        if (totalButtons === 0) return; 

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            
            currentIndex = (currentIndex + 1) % totalButtons;
            buttons[currentIndex].focus();
            event.preventDefault();
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            
            currentIndex = (currentIndex - 1 + totalButtons) % totalButtons;
            buttons[currentIndex].focus();
            event.preventDefault(); 
        } else if (event.key === 'Enter') {
            buttons[currentIndex].click();
            event.preventDefault();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('overlay');
    const mainContent = document.getElementById('mainContent');
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated === "true") {
        overlay.style.display = "none";
        mainContent.style.display = "block";
    } else {
        overlay.style.display = "block";
        mainContent.style.display = "none";
    }

});

// Функция для воспроизведения звука клика
function playClickSound() {
    const clickSound = new Audio('69880c1f5e57698.mp3');
    if (!clickSound.paused) {
        clickSound.pause();
        clickSound.currentTime = 0; 
    }
    clickSound.play();
}

// Функция для отображения текущего шага
function showStep(step) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((s, index) => {
        s.style.display = (index === step) ? 'block' : 'none'; // Показать текущий шаг, скрыть остальные
    });
}

// Функция для создания уведомления
function createNotification(message, isSuccess = true) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px';
    notification.style.backgroundColor = isSuccess ? '#28a745' : '#dc3545';
    notification.style.color = '#fff';
    notification.style.borderRadius = '5px';
    notification.textContent = message;
    document.body.appendChild(notification);
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
        document.body.removeChild(notification);
    }, 2000);
}

// Функция для валидации пароля
function validatePassword(currentPassword, newPassword, confirmNewPassword) {
    if (newPassword !== confirmNewPassword) {
        createNotification('Новый пароль и подтверждение не совпадают.', false);
        return false;
    }
    // Дополнительные проверки (длина, символы и т.д.) могут быть добавлены здесь
    return true;
}
// Функция для выхода
function logout() {
    console.log("Кнопка выхода нажата"); // Отладочная строка
    localStorage.setItem("isAuthenticated", "false");
    document.getElementById("overlay").style.display = "block"; // Показать оверлей
    document.getElementById("mainContent").style.display = "none"; // Скрыть основной контент
    document.getElementById("logoutBtn").style.display = "none"; // Скрыть кнопку выхода
}

// Обработчик для кнопки выхода
document.getElementById("logoutBtn")?.addEventListener("click", logout);

document.addEventListener('DOMContentLoaded', function () {
    // Обработка FAQ
    const faqTitles = document.querySelectorAll('.faq-title');
    faqTitles.forEach(title => {
        title.addEventListener('click', function () {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
    });
});