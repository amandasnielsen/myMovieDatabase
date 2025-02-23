import { fetchTopMovies, fetchMovies } from './modules/api.js';
import { renderTrailers } from './modules/caroussel.js';
import { toggleFavorite, populateFavorites } from './modules/favorites.js';
// import { displaySearchResults } from './modules/search.js';
// import { createMovieCard } from './modules/movieCard.js';


if(window.location.pathname === '/' || window.location.pathname === '/index.html') {
    console.log('index.html');

} else if(window.location.pathname === '/favorites.html') {
    console.log('favorites.html');

} else if(window.location.pathname === '/movie.html') {
    console.log('movie.html');

} else if(window.location.pathname === '/search.html') {
    console.log('search.html');
}

const topMovieList = [];
const favoriteMovies = [];

async function init() {
    const topMovies = await fetchTopMovies();
    topMovieList.push(...topMovies);

    if (!topMovieList || topMovieList.length === 0) {
        console.error("No list was found.");
        return;
    }

    console.log("Movielist:", topMovieList);

    const shuffledMovies = [...topMovieList].sort(() => 0.5 - Math.random());
    const selectedTrailers = shuffledMovies.slice(0, 5);

    // Loop through all movies and send 5 to renderTrailers()
    for (let i = 0; i < 5; i++) {
        renderTrailers(selectedTrailers[i], i + 1);
    }
    
    populateFavorites();

    // List all movies in the recommendation-list
    renderMovieList();
}

function renderMovieList() {
    const cardContainer = document.getElementById('cardContainer');

    // Stylingen nedan ska in i movieCard.js

    topMovieList.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.setAttribute('data-title', movie.Title);

        const poster = document.createElement('img');
        poster.classList.add('movie-card__poster');
        poster.src = movie.Poster;
        poster.alt = movie.Title;

        const bottomWrapper = document.createElement('div');
        bottomWrapper.classList.add('movie-card__bottom-wrapper');

        const title = document.createElement('h3');
        title.classList.add('movie-card__title');
        title.textContent = movie.Title;

        const star = document.createElement('span');
        star.classList.add('star');

        if (favoriteMovies.some(favMovie => favMovie.Title === movie.Title)) {
            star.classList.add('filled');
        }

        star.textContent = '★';
        star.addEventListener('click', () => toggleFavorite(movie));
        
        bottomWrapper.appendChild(title);
        bottomWrapper.appendChild(star);

        movieCard.appendChild(poster);
        movieCard.appendChild(bottomWrapper);

        cardContainer.appendChild(movieCard);

        updateStarColor(movie);
    });
}

// Update star-color if the star is pressed
function updateStarColor(movie) {
    const star = document.querySelector(`.movie-card[data-title="${movie.Title}"] .star`);
    if (favoriteMovies.some(favMovie => favMovie.Title === movie.Title)) {
        star.classList.add('filled');
    } else {
        star.classList.remove('filled');
    }
}

document.addEventListener('DOMContentLoaded', init);