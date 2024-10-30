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


document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('button'); 
    let currentIndex = 0;

    if (buttons.length > 0) {
        buttons[currentIndex].focus();
    }


    document.addEventListener('keydown', function (event) {
        const totalButtons = buttons.length;

        if (totalButtons === 0) return; 

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            
            currentIndex = (currentIndex + 1) % totalButtons;
            buttons[currentIndex].focus();
            event.preventDefault();
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            
            currentIndex = (currentIndex - 1 + totalButtons) % totalButtons;
            buttons[currentIndex].focus();
            event.preventDefault(); 
        } else if (event.key === 'Enter') {
            buttons[currentIndex].click();
            event.preventDefault();
        }
    });
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

