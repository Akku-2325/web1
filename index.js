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

    
    // Получаем контейнер для цитат и форму
    const quotesContainer = document.getElementById("quotesContainer");
    const quoteForm = document.getElementById("quoteForm");
    const quoteText = document.getElementById("quoteText");
    const quoteAuthor = document.getElementById("quoteAuthor");

    // Функция для отображения цитат
    function displayQuotes() {
        // Очищаем контейнер
        quotesContainer.innerHTML = '';

        // Получаем сохраненные цитаты из localStorage
        const quotes = JSON.parse(localStorage.getItem('quotes')) || [];

        // Заполняем контейнер новыми цитатами
        quotes.forEach(quote => {
            const quoteElement = document.createElement('p');
            quoteElement.innerHTML = `"${quote.text}" - <em>${quote.author}</em>`;
            quotesContainer.appendChild(quoteElement);
        });
    }

    // Обработчик отправки формы
    quoteForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Отменяем стандартное поведение формы

        // Получаем текст и автора цитаты
        const newQuote = {
            text: quoteText.value,
            author: quoteAuthor.value
        };

        // Сохраняем новые цитаты в localStorage
        const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
        quotes.push(newQuote);
        localStorage.setItem('quotes', JSON.stringify(quotes));

        // Очищаем поля ввода
        quoteText.value = '';
        quoteAuthor.value = '';

        // Обновляем отображение цитат
        displayQuotes();
    });

    // Вызываем функцию для отображения цитат при загрузке страницы
    window.onload = displayQuotes;

