import { fetchTopMovies, fetchMovies } from './modules/api.js';
import { renderTrailers } from './modules/caroussel.js';
// import { getFavorites, saveFavorites, displayFavorites, removeFavorite } from './modules/favorites.js';
// import { createMovieCard } from './components/movieCard.js';


if(window.location.pathname === '/' || window.location.pathname === '/index.html') {
    console.log('index.html');

} else if(window.location.pathname === '/favorites.html') {
    console.log('favorites.html');

} else if(window.location.pathname === '/movie.html') {
    console.log('movie.html');

} else if(window.location.pathname === '/search.html') {
    console.log('search.html');

}

let topMovieList = [];
let favoriteMovies = [];

async function init() {
    topMovieList = await fetchTopMovies();

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

    // List all movies in the recommendation-list
    renderMovieList();
}

function renderMovieList() {
    const cardContainer = document.getElementById('cardContainer');
    // favoriteMovies = getFavorites();

    // Stylingen nedan ska in i movieCard.js

    topMovieList.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.setAttribute('data-title', movie.Title);

        const poster = document.createElement('img');
        poster.classList.add('movie-card__poster');
        poster.src = movie.Poster;
        poster.alt = movie.Title;

        const title = document.createElement('h3');
        title.classList.add('movie-card__title');
        title.textContent = movie.Title;

        const star = document.createElement('span');
        star.classList.add('star');
        star.textContent = '★';
        star.addEventListener('click', () => toggleFavorite(movie));

        movieCard.appendChild(poster);
        movieCard.appendChild(title);
        movieCard.appendChild(star);

        cardContainer.appendChild(movieCard);

        updateStarColor(movie);
    });
}

// Favorite-movies
function toggleFavorite(movie) {
    const isFavorite = favoriteMovies.some(favMovie => favMovie.Title === movie.Title);
    
    if (isFavorite) {
        favoriteMovies = favoriteMovies.filter(favMovie => favMovie.Title !== movie.Title);
    } else {
        favoriteMovies.push(movie);
    }
    
    saveFavorites();
    updateStarColor(movie);
}

// Saving favorite movies to localStorage (sparas inte?)
function saveFavorites() {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
}

// Getting favorite-movies from localStorage
function getFavorites () {
    const storedFavorites = localStorage.getItem("favoriteMovie");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
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