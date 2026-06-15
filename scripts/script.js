import store from './modules/store.js';
import { fetchTopMovies } from './modules/api.js';
import { initFavorites, populateFavorites } from './modules/favorites.js';
import { initMovieDetails } from './modules/movie.js';
import { initSearch } from './modules/search.js';
import { renderMovieList } from './modules/movieCard.js';
import { renderTrailers, initTrailerArrows } from './modules/caroussel.js';

// Determine the current page based on the URL
// Use split and pop to get the last part of the URL since it can be in a subfolder
const path = window.location.pathname.split('/').pop();
const bodyId = document.body.id;

let currentPage = 'unknown';
if (bodyId === 'page-movie-database') {
  currentPage = 'index';
} else if (path === 'favorites.html') {
  currentPage = 'favorites';
} else if (path === 'movie.html') {
  currentPage = 'movie';
} else if (path === 'search.html') {
  currentPage = 'search';
}

// Initializing Index page with trailers and recommendations from API
async function initIndex() {
  store.topMovieList = await fetchTopMovies();
  if (!store.topMovieList || store.topMovieList.length === 0) {
    console.error('Unable to load top movies');
    return;
  }
  const shuffledMovies = [...store.topMovieList].sort(() => 0.5 - Math.random());
  const selectedTrailers = shuffledMovies.slice(0, 5);
  for (let i = 0; i < 5; i++) {
    renderTrailers(selectedTrailers[i], i + 1);
  }
  initTrailerArrows();
  renderMovieList(store.topMovieList);
}

document.addEventListener('DOMContentLoaded', () => {
  // Populate all favorites from localStorage
  // Must be loaded first because it's used in most modules, and accessible from each page
  populateFavorites();

  // Initialize search function
  initSearch();

  // Determine page and initialize it
  console.log(`Initializing ${currentPage} page`);

  if (currentPage === 'index') {
		initIndex();
	} else if (currentPage === 'favorites') {
		initFavorites();
	} else if (currentPage === 'movie') {
		initMovieDetails();
	}
});