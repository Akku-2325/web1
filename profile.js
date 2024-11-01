document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem("username"); // Получаем имя пользователя
    const registrationDate = localStorage.getItem("registrationDate"); // Получаем дату регистрации

    // Отображаем имя пользователя и дату регистрации
    const usernameElement = document.getElementById("usernameDisplay");
    const registrationDateElement = document.getElementById("registrationDateDisplay");

    if (usernameElement && username) {
        usernameElement.textContent = username; // Отображаем имя
    }
    if (registrationDateElement && registrationDate) {
        registrationDateElement.textContent = registrationDate; // Отображаем дату регистрации
    }
    
    const changePasswordForm = document.getElementById('changePasswordForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const favoritesList = document.getElementById("favoritesList");

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
    changePasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        if (validatePassword(currentPassword, newPassword, confirmNewPassword)) {
            // Логика для проверки текущего пароля и обновления на новый
            createNotification('Пароль успешно изменён!');

            // Закрыть модальное окно после изменения пароля
            $('#changePasswordModal').modal('hide');
            changePasswordForm.reset(); // Очистить форму
        }
    });

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('userToken');
        localStorage.setItem("isAuthenticated", "false");
        createNotification('Вы вышли из системы.');
        window.location.href = 'index.html'; 
    });

    // Код для работы с избранным
    if (favoritesList) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites.forEach((movie) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.textContent = movie; // Здесь предполагается, что movie - это строка с названием фильма
            favoritesList.appendChild(listItem);
        });
    }
});

// Кнопка для очистки localStorage
document.getElementById('clearStorageBtn').addEventListener('click', function() {
    localStorage.clear(); // Очистка всего localStorage
    createNotification('Данные успешно очищены.', true);
});
