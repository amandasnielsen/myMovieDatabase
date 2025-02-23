import { fetchMovies } from './api.js';
import { toggleFavorite, updateStarColor } from './favorites.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    console.log('Script loaded on:', window.location.pathname);

    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const query = searchInput.value.trim();

            if (query.length > 2) {
                searchDescription.textContent = `Here are the top 10 movies for "${query}"`;
                window.location.href = `search.html?query=${query}`;
            }
        });
    }

    // Ladda sökresultaten om vi är på search.html
    if (window.location.pathname.includes('search.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('query');

        if (query) {
            fetchMovies(query).then(movies => {
                if (movies && movies.length > 0) {
                    console.log('Movies fetched:', movies);
                    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
                    displaySearchResults(movies, searchResults, favoriteMovies);
                } else {
                    console.log('No movies found');
                    searchResults.textContent = 'No movies found.';
                }
            }).catch(error => {
                console.error('Error fetching movies:', error);
            });
        }
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

        star.addEventListener('click', () => toggleFavorite(movie));

        bottomWrapper.appendChild(title);
        bottomWrapper.appendChild(star);

        movieCard.appendChild(poster);
        movieCard.appendChild(bottomWrapper);

        searchResults.appendChild(movieCard);

        updateStarColor(movie);
    });
}
