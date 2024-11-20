document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem("username"); // Получаем имя пользователя
    const email = localStorage.getItem("userEmail"); // Получаем email
    const registrationDate = localStorage.getItem("registrationDate"); // Получаем дату регистрации

    // Отображаем имя пользователя, email и дату регистрации
    const usernameElement = document.getElementById("usernameDisplay");
    const emailElement = document.getElementById("emailDisplay"); // Элемент для отображения email
    const registrationDateElement = document.getElementById("registrationDateDisplay");

    if (usernameElement && username) {
        usernameElement.textContent = username; // Отображаем имя
    }
    if (emailElement && email) {
        emailElement.textContent = email; // Отображаем email
    }
    if (registrationDateElement && registrationDate) {
        registrationDateElement.textContent = registrationDate; // Отображаем дату регистрации
    }

    // Проверка подписки
    const isSubscribed = localStorage.getItem("isSubscribed") === "true"; // Проверка подписки
    const subscriptionStatusElement = document.getElementById("subscriptionStatus");

    if (subscriptionStatusElement) {
        subscriptionStatusElement.textContent = isSubscribed ? 
            "Подписан! Новости о новинках будут приходить на ваш email!" : 
            "Не подписан...";
    }

    // Уведомление
    const createNotification = (message, isSuccess = true) => {
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
    };

    // Валидация пароля
    const validatePassword = (currentPassword, newPassword, confirmNewPassword) => {
        if (newPassword !== confirmNewPassword) {
            createNotification('Новый пароль и подтверждение не совпадают.', false);
            return false;
        }
        return true;
    };

    // Обработчик отправки формы изменения пароля
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmNewPassword = document.getElementById('confirmNewPassword').value;

            const savedPassword = localStorage.getItem("userPassword");

            if (!savedPassword || savedPassword !== btoa(currentPassword)) {
                createNotification("Текущий пароль неверный!", false);
                return;
            }

            if (validatePassword(currentPassword, newPassword, confirmNewPassword)) {
                localStorage.setItem("userPassword", btoa(newPassword));
                createNotification('Пароль успешно изменён!');

                // Закрыть модальное окно после изменения пароля
                $('#changePasswordModal').modal('hide');
                changePasswordForm.reset(); // Очистить форму
            }
        });
    }

    // Обработчик для выхода из системы
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('userToken');
            localStorage.setItem("isAuthenticated", "false");
            createNotification('Вы вышли из системы.');
            window.location.href = 'index.html'; 
        });
    }

    // Работа с элементами "Посмотреть позже"
    const watchLaterSection = document.querySelector("#watchLater");
    const watchLaterMovies = JSON.parse(localStorage.getItem("watchLaterMovies")) || [];

    if (watchLaterMovies.length > 0) {
        watchLaterSection.innerHTML = ''; // Очищаем контейнер перед добавлением новых элементов
        watchLaterMovies.forEach(movie => {
            const movieEl = document.createElement("div");
            movieEl.classList.add("movie");
            movieEl.innerHTML = `
                <div class="movie__cover-inner">
                    <img src="${movie.posterUrlPreview}" class="movie__cover" alt="${movie.nameRu}" />
                    <div class="movie__cover--darkened"></div>
                </div>
                <div class="movie__info">
                    <div class="movie__title">${movie.nameRu}</div>
                    <div class="movie__category">${movie.genres.map(genre => ` ${genre.genre}`).join(', ')}</div>
                </div>
            `;
            watchLaterSection.appendChild(movieEl);
        });
    } else {
        watchLaterSection.innerHTML = `<p>Нет фильмов в списке "Посмотреть позже".</p>`;
    }
});
