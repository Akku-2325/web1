document.addEventListener('DOMContentLoaded', function() {
    const changePasswordForm = document.getElementById('changePasswordForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Обработчик отправки формы изменения пароля
    changePasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        // Простая валидация
        if (newPassword !== confirmNewPassword) {
            alert('Новый пароль и подтверждение не совпадают.');
            return;
        }

        // Здесь вы можете добавить логику для проверки текущего пароля и обновления на новый
        // Например, отправка данных на сервер через AJAX
        alert('Пароль успешно изменён!');

        // Закрыть модальное окно после изменения пароля
        $('#changePasswordModal').modal('hide');
        changePasswordForm.reset(); // Очистить форму
    });

    logoutBtn.addEventListener('click', function() {
        // Удалить токены или данные сессии
        localStorage.removeItem('userToken'); // Пример: удаление токена из localStorage
        sessionStorage.removeItem('userData'); // Пример: удаление данных пользователя из sessionStorage
        localStorage.setItem("isAuthenticated", "false"); // Установите состояние аутентификации в false
    
        // Показать сообщение о выходе
        alert('Вы вышли из системы.');
    
        // Перенаправить на главную страницу
        window.location.href = 'index.html'; // Замените на нужный URL главной страницы
    });
    
});
document.addEventListener('DOMContentLoaded', function () {
    const favoriteButton = document.getElementById('favoriteButton');
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px';
    notification.style.backgroundColor = '#28a745';
    notification.style.color = '#fff';
    notification.style.borderRadius = '5px';
    notification.style.display = 'none';
    document.body.appendChild(notification);

    // Восстановление состояния избранного
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const currentMovieId = 'film-1'; // Замените на ID текущего фильма

    const isFavorite = favoriteMovies.includes(currentMovieId);
    favoriteButton.textContent = isFavorite ? 'Убрать из избранного' : 'Добавить в избранное';

    favoriteButton.addEventListener('click', function () {
        if (isFavorite) {
            // Удалить из избранного
            const index = favoriteMovies.indexOf(currentMovieId);
            if (index > -1) {
                favoriteMovies.splice(index, 1);
            }
            favoriteButton.textContent = 'Добавить в избранное';
            notification.textContent = 'Убрано из избранного.';
        } else {
            // Добавить в избранное
            favoriteMovies.push(currentMovieId);
            favoriteButton.textContent = 'Убрать из избранного';
            notification.textContent = 'Добавлено в избранное!';
        }

        // Сохранить состояние избранного в локальное хранилище
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    });
});
