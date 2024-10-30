document.addEventListener('DOMContentLoaded', function () {
    const favoriteButton = document.getElementById('favoriteButton');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const stars = document.querySelectorAll('.star');
    const reviewForm = document.getElementById('reviewForm');
    const userReviews = document.querySelector('.user-reviews');
    const readMoreBtn = document.getElementById('readMoreBtn');
    const moreContent = document.getElementById('moreContent');

    // Уведомление
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
    const isFavorite = localStorage.getItem("isFavorite") === "true";
    favoriteButton.textContent = isFavorite ? 'Убрать из избранного' : 'Добавить в избранное';

    if (favoriteButton) {
        favoriteButton.addEventListener('click', function () {
            const isAddingToFavorites = favoriteButton.textContent === 'Добавить в избранное';
            favoriteButton.textContent = isAddingToFavorites ? 'Убрать из избранного' : 'Добавить в избранное';

            // Сохранение состояния избранного в локальное хранилище
            localStorage.setItem("isFavorite", isAddingToFavorites);
            notification.textContent = isAddingToFavorites ? 'Добавлено в избранное!' : 'Убрано из избранного.';
            notification.style.backgroundColor = isAddingToFavorites ? '#28a745' : '#dc3545';
            notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 2000);
        });
    }

    // Восстановление отзывов при загрузке страницы
    const savedReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
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
        localStorage.setItem('userReviews', JSON.stringify(savedReviews));
        document.getElementById('review').value = '';

        // Уведомление об успешном добавлении отзыва
        notification.textContent = 'Отзыв успешно добавлен!';
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    });

    function addReviewToDOM(review) {
        const newReview = document.createElement('p');
        newReview.innerHTML = `<strong>Пользователь:</strong> ${review}`;
        userReviews.appendChild(newReview);
    }

    // Восстановление рейтинга при загрузке страницы
    const savedRating = localStorage.getItem('userRating');
    if (savedRating) {
        document.getElementById('userRating').innerText = savedRating;
        updateStarRating(savedRating);
    }

    stars.forEach(star => {
        star.addEventListener('click', function () {
            const ratingValue = this.getAttribute('data-value');
            document.getElementById('userRating').innerText = ratingValue; 
            updateStarRating(ratingValue);

            // Сохранение рейтинга в локальное хранилище
            localStorage.setItem('userRating', ratingValue);
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
