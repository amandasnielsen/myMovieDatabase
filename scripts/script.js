import store from './modules/store.js';
import { fetchTopMovies } from './modules/api.js';
import { initFavorites, populateFavorites } from './modules/favorites.js';
import { initMovieDetails } from './modules/movie.js';
import { initSearch } from './modules/search.js';
import { renderMovieList } from './modules/movieCard.js';
import { renderTrailers } from './modules/caroussel.js';

// Determine the current page based on the URL
// Use split and pop to get the last part of the URL since it can be in a subfolder
let currentPage = 'index';

if (window.location.pathname.split('/').pop() === 'favorites.html') {
	currentPage = 'favorites';
} else if (window.location.pathname.split('/').pop() === 'movie.html') {
	currentPage = 'movie';
} else if (window.location.pathname.split('/').pop() === 'search.html') {
	currentPage = 'search';
};

// Initializing Index page with trailers and recommendations from API
async function initIndex() {
	// Fetch top movies
	store.topMovieList = await fetchTopMovies();

	// Make sure we have top movies from API
	if (!store.topMovieList || store.topMovieList.length === 0) {
		console.error('Unable to load top movies');
		return;
	};

	// Shuffle all top movies by scrambling their indexes and select the first 5 elements
	const shuffledMovies = [...store.topMovieList].sort(() => 0.5 - Math.random());
	const selectedTrailers = shuffledMovies.slice(0, 5);

	// Loop through all movies and send 5 to renderTrailers()
	for (let i = 0; i < 5; i++) {
		renderTrailers(selectedTrailers[i], i + 1);
	};

	// List all top movies
	renderMovieList(store.topMovieList);
};

document.addEventListener('DOMContentLoaded', () => {
	// Populate all favorites from localStorage
	// Must be loaded first because it's used in most modules, and accessible from each page
	populateFavorites();

	// Initialize search function
	initSearch();

	// Determine page and initialize it
	console.log(`Initializing ${currentPage} page`);

	// Init the correct page based on the currentPage variable
	if (currentPage === 'index') {
		initIndex();
	} else if (currentPage === 'favorites') {
		initFavorites();
	} else if (currentPage === 'movie') {
		initMovieDetails();
	};
});