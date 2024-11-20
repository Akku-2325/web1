const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");
  
    // Очищаем предыдущие фильмы
    document.querySelector(".movies").innerHTML = "";
  
    data.films.forEach((movie) => {
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
          <div class="movie__cover-inner">
          <img
            src="${movie.posterUrlPreview}"
            class="movie__cover"
            alt="${movie.nameRu}"
          />
          <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
          <div class="movie__title">${movie.nameRu}</div>
          <div class="movie__category">${movie.genres.map(
            (genre) => ` ${genre.genre}`
          )}</div>
          ${
            movie.rating &&
            `
          <div class="movie__average movie__average--${getClassByRate(
            movie.rating
          )}">${movie.rating}</div>
          `
          }
        </div>
          <button class="watch-later-btn" data-id="${movie.filmId}">Посмотреть позже</button>
      `;
      
      // Добавляем слушатель для кнопки "Посмотреть позже"
      const watchLaterBtn = movieEl.querySelector(".watch-later-btn");
      watchLaterBtn.addEventListener("click", () => addToWatchLater(movie));
  
      movieEl.addEventListener("click", () => openModal(movie.filmId));
      moviesEl.appendChild(movieEl);
    });
  }
  function addToWatchLater(movie) {
    let watchLaterMovies = JSON.parse(localStorage.getItem("watchLaterMovies")) || [];
  
    // Проверим, если фильм уже есть в списке
    if (!watchLaterMovies.some((item) => item.filmId === movie.filmId)) {
      watchLaterMovies.push(movie); // Добавляем фильм в список
      localStorage.setItem("watchLaterMovies", JSON.stringify(watchLaterMovies));
      alert(`${movie.nameRu} добавлен в список "Посмотреть позже"!`);
    } else {
      alert(`${movie.nameRu} уже в списке "Посмотреть позже"`);
    }
  }
    

const form = document.querySelector("#searchForm");
const search = document.querySelector("#searchInput");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
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

// Modal
const modalEl = document.querySelector(".modal");

async function openModal(id) {
  const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  
  modalEl.classList.add("modal--show");
  document.body.classList.add("stop-scrolling");

  modalEl.innerHTML = `
    <div class="modal__card">
      <img class="modal__movie-backdrop" src="${respData.posterUrl}" alt="">
      <h2>
        <span class="modal__movie-title">${respData.nameRu}</span>
        <span class="modal__movie-release-year"> - ${respData.year}</span>
      </h2>
      <ul class="modal__movie-info">
        <div class="loader"></div>
        <li class="modal__movie-genre">Жанр - ${respData.genres.map((el) => `<span>${el.genre}</span>`)}</li>
        ${respData.filmLength ? `<li class="modal__movie-runtime">Время - ${respData.filmLength} минут</li>` : ''}
        <li >Сайт: <a class="modal__movie-site" href="${respData.webUrl}">${respData.webUrl}</a></li>
        <li class="modal__movie-overview">Описание - ${respData.description}</li>
      </ul>
      <button type="button" class="modal__button-close">Закрыть</button>
    </div>
  `
  const btnClose = document.querySelector(".modal__button-close");
  btnClose.addEventListener("click", () => closeModal());
}

function closeModal() {
  modalEl.classList.remove("modal--show");
  document.body.classList.remove("stop-scrolling");
}

window.addEventListener("click", (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
})

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    closeModal();
  }
})

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

    // subscribe.js

document.addEventListener('DOMContentLoaded', function() {
    const subscribeBtn = document.getElementById('subscribeBtn');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('closePopup');
    const subscribeForm = document.getElementById('subscribeForm');
    const subscribeEmailInput = document.getElementById('subscribeEmail');

    // Открытие попапа при нажатии на кнопку
    subscribeBtn.addEventListener('click', function() {
        popup.style.display = 'flex'; // Показываем попап
    });

    // Закрытие попапа
    closePopupBtn.addEventListener('click', function() {
        popup.style.display = 'none'; // Скрываем попап
    });

    // Обработчик отправки формы подписки
    subscribeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const subscribeEmail = subscribeEmailInput.value;

        if (subscribeEmail) {
            // Сохраняем информацию о подписке в localStorage
            localStorage.setItem("isSubscribed", "true");

            // Закрываем попап
            popup.style.display = 'none';
            alert('Вы успешно подписались на новости!');
        }
    });
});



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

