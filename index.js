    // Обработка кнопки подписки и всплывающего окна
    const subscribeBtn = document.getElementById('subscribeBtn');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');

    subscribeBtn.addEventListener('click', function () {
        popup.style.display = 'block';
    });

    closePopup.addEventListener('click', function () {
        popup.style.display = 'none';
    });



    // Проверка аутентификации
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated === "true") {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("logoutBtn").style.display = "inline-block"; // Показать кнопку выхода
    } else {
        document.getElementById("mainContent").style.display = "none"; // Скрыть основной контент
        alert('Вы вышли из системы.'); // Сообщение о выходе
    }

    // Обработка формы аутентификации
    document.getElementById("authForm")?.addEventListener("submit", function (event) {
        event.preventDefault();
        localStorage.setItem("isAuthenticated", "true");
        document.getElementById("overlay").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("logoutBtn").style.display = "inline-block"; // Показать кнопку выхода
    });

  