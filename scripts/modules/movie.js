import { fetchMovieDetails } from './api.js';
import store from './store.js';
import { toggleFavorite } from './favorites.js';

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

	star.addEventListener('click', e => {
		e.stopPropagation();
		toggleFavorite(movie);
		toggleStar(movie);
	});
};

function toggleStar(movie) {
	const star = document.querySelector('.movie-details .star');

	if (store.favoriteMovies.some(favMovie => favMovie.imdbID === movie.imdbID)) {
		star.classList.add('filled');
	} else {
		star.classList.remove('filled');
	};
};