import { fetchMovies } from './modules/api.js';


document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

            const query = searchInput.value.trim();
            if (query.length > 2) {
                window.location.href = `search.html?query=${query}`;
            }
        });
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

            if (favoriteMovies.some(favMovie => favMovie.Title === movie.Title)) {
                star.classList.add('filled');
            }

            star.textContent = '★';
            star.addEventListener('click', () => toggleFavorite(movie));

            bottomWrapper.appendChild(title);
            bottomWrapper.appendChild(star);

            movieCard.appendChild(poster);
            movieCard.appendChild(bottomWrapper);

            searchResults.appendChild(movieCard);

            updateStarColor(movie);
        });
    }
