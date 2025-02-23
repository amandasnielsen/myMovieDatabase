import { getStore } from './store.js';

const store = getStore();
const localStorageKeyFavorites = 'favoriteMovies';

// Favorite-movies
export function toggleFavorite(movie) {
	const favoriteIndex = store.favoriteMovies.findIndex(favMovie => favMovie.Title === movie.Title);

	if (favoriteIndex === -1) {
		store.favoriteMovies.push(movie);
	} else {
		store.favoriteMovies.splice(favoriteIndex, 1);
		saveFavorites();
		updateStarColor(movie);
		
		if (window.location.pathname.split('/').pop() === 'favorites.html') {
			location.reload();
		}
		return;
	}

	saveFavorites();
	updateStarColor(movie);
}

// Saving favorite movies to localStorage
function saveFavorites() {
	localStorage.setItem(localStorageKeyFavorites, JSON.stringify(store.favoriteMovies));
}

// Getting favorite-movies from localStorage
export function populateFavorites() {
	console.log('Populating favorite movies from localStorage')

	const storedFavorites = localStorage.getItem(localStorageKeyFavorites);

	if (storedFavorites) {
		store.favoriteMovies.push(...JSON.parse(storedFavorites));
	}
}

// Update star-color if the star is pressed
export function updateStarColor(movie) {
	const star = document.querySelector(`.movie-card[data-title="${movie.Title}"] .star`);

	if (store.favoriteMovies.some(favMovie => favMovie.Title === movie.Title)) {
		star.classList.add('filled');
	} else {
		star.classList.remove('filled');
	}
}