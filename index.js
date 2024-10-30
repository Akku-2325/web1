document.addEventListener('DOMContentLoaded', function () {
    const faqTitles = document.querySelectorAll('.faq-title');
    faqTitles.forEach(title => {
        title.addEventListener('click', function () {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
    });

    const subscribeBtn = document.getElementById('subscribeBtn');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');

    subscribeBtn.addEventListener('click', function () {
        popup.style.display = 'block';
    });

    closePopup.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated === "true") {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("logoutBtn").style.display = "inline-block"; // Показать кнопку выхода
    } else {
        document.getElementById("mainContent").style.display = "none"; // Скрыть основной контент
    }

    document.getElementById("authForm")?.addEventListener("submit", function (event) {
        event.preventDefault();
        localStorage.setItem("isAuthenticated", "true");
        document.getElementById("overlay").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("logoutBtn").style.display = "inline-block"; // Показать кнопку выхода
    });

    // Обработчик для кнопки выхода
    document.getElementById("logoutBtn")?.addEventListener("click", function () {
        localStorage.setItem("isAuthenticated", "false");
        document.getElementById("overlay").style.display = "block"; // Показать оверлей
        document.getElementById("mainContent").style.display = "none"; // Скрыть основной контент
        this.style.display = "none"; // Скрыть кнопку выхода
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    let hasLoggedOut = false;

    if (isAuthenticated === "true") {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("logoutBtn").style.display = "inline-block"; // Показать кнопку выхода
    } else {
        document.getElementById("mainContent").style.display = "none"; // Скрыть основной контент
        alert('Вы вышли из системы.'); // Выводим сообщение о выходе
    }

    // Код для обработки входа
    document.getElementById("authForm")?.addEventListener("submit", function (event) {
        event.preventDefault();
        localStorage.setItem("isAuthenticated", "true");
        document.getElementById("overlay").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("logoutBtn").style.display = "inline-block"; // Показать кнопку выхода
    });
});
