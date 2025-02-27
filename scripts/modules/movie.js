import { fetchMovieDetails } from './api.js';
import store from './store.js';
import { toggleFavorite } from './favorites.js';

// Initalizing movie details when the movie-card is clicked
export function initMovieDetails() {
	const urlParams = new URLSearchParams(window.location.search);
	const imdbID = urlParams.get('imdbID');
	const movieInfo = document.querySelector('.movie-details');

	if (imdbID) {
		fetchMovieDetails(imdbID).then(movie => {
			if (movie) {
				displayMovieDetails(movie);
				movieInfo.classList.remove('d-none');
			} else {
				console.log('No movie details found.');
			};
		});
	};
};

// Function for creating elements to the movie-card to show the details
export function displayMovieDetails(movie) {
	const movieTitle = document.getElementById('movieTitle');
	const moviePoster = document.getElementById('moviePoster');
	const moviePlot = document.getElementById('moviePlot');
	const movieYear = document.getElementById('movieYear');

	if (movieTitle) movieTitle.textContent = movie.Title;
	if (moviePoster) moviePoster.src = movie.Poster;
	if (moviePlot) moviePlot.textContent = movie.Plot;
	if (movieYear) movieYear.textContent = `Year: ${movie.Year}`;

	const star = document.querySelector('.movie-details .star');

	toggleStar(movie);

	// Adding event-listener to the star in the movie-card, so it can be clicked and added to favorites
	star.addEventListener('click', e => {
		e.stopPropagation();
		toggleFavorite(movie);
		toggleStar(movie);
	});
};

// Making sure that the star in the movie-card is filled or not filled,
// depending if it is added to favorites, or removed.
// Using imdbID instead of imdb title, beacuse the same movie can have different names
// in the different API:s, but the imdbID stays the same.
function toggleStar(movie) {
	const star = document.querySelector('.movie-details .star');

	if (store.favoriteMovies.some(favMovie => favMovie.imdbID === movie.imdbID)) {
		star.classList.add('filled');
	} else {
		star.classList.remove('filled');
	};
};