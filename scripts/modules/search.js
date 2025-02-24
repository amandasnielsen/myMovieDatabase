import { fetchMovies } from './api.js';
import { toggleFavorite, updateStarColor } from './favorites.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchDescription = document.querySelector('.search-description');
    const query = new URLSearchParams(window.location.search).get('query');

    console.log('Script loaded on:', window.location.pathname);

    searchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query.length > 2) window.location.href = `search.html?query=${query}`;
    });

    if (window.location.pathname.includes('search.html') && query) {

        if (searchDescription) {
            searchDescription.textContent = `Here are the top 10 results based on "${query}"`;
        }

        fetchMovies(query).then(movies => {
            if (movies?.length) {
                const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
                displaySearchResults(movies, searchResults, favoriteMovies);
            } else {
                searchResults.textContent = 'No movies found.';
            }
        }).catch(console.error);
    }
});

export function displaySearchResults(movies, searchResults, favoriteMovies) {
    searchResults.textContent = '';

    movies.slice(0, 10).forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.setAttribute('data-title', movie.Title);

        const poster = document.createElement('img');
        poster.classList.add('movie-card__poster');
        poster.src = movie.Poster !== "N/A" ? movie.Poster : 'default.jpg';
        poster.alt = movie.Title;

        const bottomWrapper = document.createElement('div');
        bottomWrapper.classList.add('movie-card__bottom-wrapper');

        const title = document.createElement('h3');
        title.classList.add('movie-card__title');
        title.textContent = movie.Title;

        const star = document.createElement('span');
        star.classList.add('star');
        star.textContent = '★';

        if (favoriteMovies.some(favMovie => favMovie.Title === movie.Title)) {
            star.classList.add('filled');
        }

        star.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleFavorite(movie);
        });

        bottomWrapper.appendChild(title);
        bottomWrapper.appendChild(star);

        movieCard.appendChild(poster);
        movieCard.appendChild(bottomWrapper);

        movieCard.addEventListener('click', () => {
            window.location.href = `movie.html?imdbID=${movie.imdbID}`;
        });

        searchResults.appendChild(movieCard);

        updateStarColor(movie);
    });
}
