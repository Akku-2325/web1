document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("userEmail");
    const registrationDate = localStorage.getItem("registrationDate");

    const usernameElement = document.getElementById("usernameDisplay");
    const emailElement = document.getElementById("emailDisplay");
    const registrationDateElement = document.getElementById("registrationDateDisplay");

    if (usernameElement && username) {
        usernameElement.textContent = username;
    }
    if (emailElement && email) {
        emailElement.textContent = email;
    }
    if (registrationDateElement && registrationDate) {
        registrationDateElement.textContent = registrationDate;
    }

    const isSubscribed = localStorage.getItem("isSubscribed") === "true";
    const subscriptionStatusElement = document.getElementById("subscriptionStatus");

    if (subscriptionStatusElement) {
        subscriptionStatusElement.textContent = isSubscribed ?
            "Подписан! Новости о новинках будут приходить на ваш email!" :
            "Не подписан...";
    }

    // Кнопка для отмены подписки
    const unsubscribeBtn = document.getElementById('unsubscribeBtn');
    if (unsubscribeBtn) {
        unsubscribeBtn.addEventListener('click', function () {
            localStorage.setItem("isSubscribed", "false");
            subscriptionStatusElement.textContent = "Не подписан...";
            createNotification("Вы успешно отписались от рассылки.", false);
        });
    }

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

    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmNewPassword = document.getElementById('confirmNewPassword').value;

            const savedPassword = localStorage.getItem("userPassword");

            if (!savedPassword || savedPassword !== btoa(currentPassword)) {
                createNotification("Текущий пароль неверный!", false);
                return;
            }

            if (newPassword !== confirmNewPassword) {
                createNotification('Новый пароль и подтверждение не совпадают.', false);
                return;
            }

            localStorage.setItem("userPassword", btoa(newPassword));
            createNotification('Пароль успешно изменён!');
            $('#changePasswordModal').modal('hide');
            changePasswordForm.reset();
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('userToken');
            localStorage.setItem("isAuthenticated", "false");
            createNotification('Вы вышли из системы.');
            window.location.href = 'index.html';
        });
    }

    const watchLaterSection = document.querySelector("#watchLater");
    const watchLaterMovies = JSON.parse(localStorage.getItem("watchLaterMovies")) || [];

    if (watchLaterMovies.length > 0) {
        watchLaterSection.innerHTML = '';
        watchLaterMovies.forEach((movie, index) => {
            const movieEl = document.createElement("div");
            movieEl.classList.add("movie");
            movieEl.innerHTML = `
                <div class="movie__cover-inner">
                    <img src="${movie.posterUrlPreview}" class="movie__cover" alt="${movie.nameRu}" />
                </div>
                <div class="movie__info">
                    <div class="movie__title">${movie.nameRu}</div>
                    <div class="movie__category">${movie.genres.map(genre => ` ${genre.genre}`).join(', ')}</div>
                    <button class="remove-movie-btn" data-index="${index}">Удалить</button>
                </div>
            `;
            watchLaterSection.appendChild(movieEl);
        });

        document.querySelectorAll(".remove-movie-btn").forEach(button => {
            button.addEventListener("click", function () {
                const movieIndex = this.getAttribute("data-index");
                watchLaterMovies.splice(movieIndex, 1);
                localStorage.setItem("watchLaterMovies", JSON.stringify(watchLaterMovies));
                createNotification("Фильм удалён из списка.");
                location.reload();
            });
        });
    } else {
        watchLaterSection.innerHTML = `<p>Нет фильмов в списке "Посмотреть позже".</p>`;
    }
});
