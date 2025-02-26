import store from './store.js';
import { deleteCard } from './movieCard.js';
import { renderMovieList } from './movieCard.js';

const localStorageFavoritesKey = 'favoriteMovies';

/*
 * Initialize the favorites page
 *
 * List all favorite movies
 */
export function initFavorites() {
	// List all favorite movies
	renderMovieList(store.favoriteMovies);
};

/* 
 * Toggle favorite status of a movie
 *
 * If the movie is not in favorites, add it.
 * If the movie is in favorites, remove it.
 * Save the favorites to localStorage
 * Update the star-color
 * 
 */
export function toggleFavorite(movie) {
	// Find the index of the movie in the favorites array
	// If the movie is not in favorites, the index will be -1
	const favoriteIndex = store.favoriteMovies.findIndex(favMovie => favMovie.imdbID === movie.imdbID);

	// Determine if the movie is in favorites or if it should be added
	if (favoriteIndex === -1) {
		console.log('Adding movie to favorites');
		store.favoriteMovies.push(movie);
	} else {
		console.log('Removing movie from favorite');
		store.favoriteMovies.splice(favoriteIndex, 1);

		// Delete the element from the DOM if the user is on the favorites page
		if (window.location.pathname.split('/').pop() === 'favorites.html') {
			deleteCard(favoriteIndex);
		};
	};

	// Save the favorites to localStorage
	saveFavorites();

	// Update the star color
	updateStarColor(movie);
}

/* 
 * Save favorite movies to localStorage
 */
function saveFavorites() {
	console.log('Updating favorite movies in localStorage');

	// Local/session storage and cookies can only store strings
	// We use JSON.stringify to convert the array to a string
	localStorage.setItem(localStorageFavoritesKey, JSON.stringify(store.favoriteMovies));
};

/*
 * Populate favorite movies from localStorage
 */
export function populateFavorites() {
	console.log('Populating favorite movies from localStorage');

	const storedFavorites = localStorage.getItem(localStorageFavoritesKey);

	if (storedFavorites) {
		// storedFavorites should be a stringified array of movie objects
		// We use JSON.parse to convert the string back to an array.
		// Push the statuses with array destructuring instead of reassigning the array
		// to avoid any potential issues
		store.favoriteMovies.push(...JSON.parse(storedFavorites));
	};
};

/*
 * Update the star color of a movie card
 *
 * If the movie is in favorites, fill the star
 * If the movie is not in favorites, empty the star
 */
export function updateStarColor(movie) {
	const star = document.querySelector(`.movie-card[data-title="${movie.Title}"] .star`);

	// If the star is not found, it means the user is on the favorites page
	// and the card has been deleted. In this case, we don't need to update the star.
	if (!star) {
		return;
	}

	if (store.favoriteMovies.some(favMovie => favMovie.imdbID === movie.imdbID)) {
		star.classList.add('filled');
	} else {
		star.classList.remove('filled');
	};
};