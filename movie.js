document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem("username"); // Получаем имя пользователя
    if (!username) return; // Проверяем, чтобы код выполнялся только после регистрации или входа пользователя

    const favoriteButton = document.getElementById('favoriteButton');
    const reviewForm = document.getElementById('reviewForm');
    const userReviews = document.querySelector('.user-reviews');
    const stars = document.querySelectorAll('.star');
    const userRatingElement = document.getElementById('userRating');
    const readMoreBtn = document.getElementById('readMoreBtn');
    const moreContent = document.getElementById('moreContent');

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

    // Восстановление состояния избранного для текущего пользователя
    const isFavoriteKey = `${username}_isFavorite`;
    const removedMoviesKey = `${username}_removedFavorites`;
    const isFavorite = localStorage.getItem(isFavoriteKey) === "true";
    favoriteButton.textContent = isFavorite ? 'Убрать из избранного' : 'Добавить в избранное';

    const removedMovies = JSON.parse(localStorage.getItem(removedMoviesKey)) || [];

    favoriteButton.addEventListener('click', function () {
        const isAddingToFavorites = favoriteButton.textContent === 'Добавить в избранное';
        favoriteButton.textContent = isAddingToFavorites ? 'Убрать из избранного' : 'Добавить в избранное';

        // Сохранение состояния избранного для текущего пользователя
        localStorage.setItem(isFavoriteKey, isAddingToFavorites);
        
        if (!isAddingToFavorites) {
            // Добавляем фильм в список убранных
            removedMovies.push("Название фильма"); // Вместо "Название фильма" используйте текущий фильм
            localStorage.setItem(removedMoviesKey, JSON.stringify(removedMovies));
        }
        
        createNotification(isAddingToFavorites ? 'Добавлено в избранное!' : 'Убрано из избранного.', isAddingToFavorites);
    });

    // Отображение убранных фильмов в профиле
    const removedMoviesList = document.getElementById("removedMoviesList");
    if (removedMoviesList) {
        removedMovies.forEach((movie) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.textContent = movie;
            removedMoviesList.appendChild(listItem);
        });
    }

    // Восстановление отзывов пользователя при загрузке страницы
    const reviewsKey = `${username}_userReviews`;
    const savedReviews = JSON.parse(localStorage.getItem(reviewsKey)) || [];
    savedReviews.forEach(review => {
        addReviewToDOM(review);
    });

    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const review = document.getElementById('review').value;

        if (review.trim() === '') {
            alert('Пожалуйста, введите ваш отзыв.');
            return;
        }

        // Добавление отзыва в DOM и в локальное хранилище
        addReviewToDOM(review);
        savedReviews.push(review);
        localStorage.setItem(reviewsKey, JSON.stringify(savedReviews));
        document.getElementById('review').value = '';

        // Уведомление об успешном добавлении отзыва
        createNotification('Отзыв успешно добавлен!');
    });

    function addReviewToDOM(review) {
        const newReview = document.createElement('p');
        newReview.innerHTML = `<strong>Пользователь:</strong> ${review}`;
        userReviews.appendChild(newReview);
    }

    // Восстановление рейтинга при загрузке страницы для текущего пользователя
    const ratingKey = `${username}_userRating`;
    const savedRating = localStorage.getItem(ratingKey);
    if (savedRating) {
        userRatingElement.innerText = savedRating;
        updateStarRating(savedRating);
    }

    stars.forEach(star => {
        star.addEventListener('click', function () {
            const ratingValue = this.getAttribute('data-value');
            userRatingElement.innerText = ratingValue;
            updateStarRating(ratingValue);

            // Сохранение рейтинга в локальное хранилище
            localStorage.setItem(ratingKey, ratingValue);
            createNotification(`Вы поставили рейтинг: ${ratingValue} звезда(ы)`);
        });
    });

    function updateStarRating(rating) {
        stars.forEach(star => {
            star.style.color = star.getAttribute('data-value') <= rating ? 'gold' : 'grey';
        });
    }

    // Чтение больше контента
    readMoreBtn.addEventListener('click', () => {
        if (moreContent.style.display === 'none') {
            moreContent.style.display = 'block';
            readMoreBtn.textContent = 'Скрыть';
        } else {
            moreContent.style.display = 'none';
            readMoreBtn.textContent = 'Читать дальше';
        }
    });
});
