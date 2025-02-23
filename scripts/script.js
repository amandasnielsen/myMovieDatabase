import { fetchTopMovies, fetchMovies } from './modules/api.js';
import { renderTrailers } from './modules/caroussel.js';
import { populateFavorites } from './modules/favorites.js';
import { displaySearchResults } from './modules/search.js';
import { createMovieCard } from './modules/movieCard.js';
import { getStore } from './modules/store.js';
import { displayMovieDetails } from './modules/movie.js';

const store = getStore();
let currentPage = 'index'

if (window.location.pathname.split('/').pop() === 'favorites.html') {
	currentPage = 'favorites';
} else if (window.location.pathname.split('/').pop() === 'movie.html') {
	currentPage = 'movie';
} else if (window.location.pathname.split('/').pop() === 'search.html') {
	currentPage = 'search';
}

console.log(`Current page: ${currentPage}`);

async function initIndex() {
	console.log('Initializing index page')

	store.topMovieList = await fetchTopMovies();

	if (!store.topMovieList || store.topMovieList.length === 0) {
		console.error("No list was found.");
		return;
	}

	console.log("Movielist:", store.topMovieList);

	const shuffledMovies = [...store.topMovieList].sort(() => 0.5 - Math.random());
	const selectedTrailers = shuffledMovies.slice(0, 5);

	// Loop through all movies and send 5 to renderTrailers()
	for (let i = 0; i < 5; i++) {
		renderTrailers(selectedTrailers[i], i + 1);
	}

	populateFavorites();

	// List all movies in the recommendation-list
	renderMovieList(store.topMovieList);
}

function initFavorites() {
	console.log('Initializing favorites page');

	populateFavorites();
	renderMovieList(store.favoriteMovies);
}

function renderMovieList(movieList) {
	const cardContainer = document.getElementById('cardContainer');

	movieList.forEach(movie => {
		const isFavorite = store.favoriteMovies.some(favMovie => favMovie.Title === movie.Title)
		createMovieCard(movie, isFavorite);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	if (currentPage === 'index') {
		initIndex();
	} else if (currentPage === 'favorites') {
		initFavorites();
	}
});