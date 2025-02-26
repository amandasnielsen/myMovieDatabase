import { toggleFavorite } from './favorites.js';
import store from './store.js';

// TODO Comment this
const baseUrl = window.location.pathname.split('/').slice(0, -1).join('/');

/* 
 * Create a movie card element
 *
 * The card contains a poster, title, and a star icon
 * The star icon is clickable and toggles the favorite status
 */
export async function createMovieCard(movie, isFavorite) {
	const container = document.getElementById('cardContainer');

	// Create the movie card element
	const movieCard = document.createElement('div');
	movieCard.classList.add('movie-card');
	movieCard.setAttribute('data-title', movie.Title);
	movieCard.addEventListener('click', () => {
		window.location.href = `movie.html?imdbID=${movie.imdbID}`;
	});

	// Create the poster element
	const poster = document.createElement('img');
	poster.classList.add('movie-card__poster');

	// Check if the movie has a valid poster url and check that the url is reachable
	// If the poster is not available, use a placeholder image 
	if (!movie.Poster || movie.Poster === 'N/A') {
		poster.src = `${baseUrl}/res/icons/missing-poster.svg`;
	} else {
		try {
			await fetch(movie.Poster);
			poster.src = movie.Poster;
		} catch (error) {
			console.log('Poster not found:', error.message);
			// If the poster fails to load, use a placeholder image
			poster.src = `${baseUrl}/res/icons/missing-poster.svg`;	
		};
	};

	poster.alt = movie.Title;

	// Create the bottom wrapper element
	const bottomWrapper = document.createElement('div');
	bottomWrapper.classList.add('movie-card__bottom-wrapper');

	// Create the title element
	const title = document.createElement('h3');
	title.classList.add('movie-card__title');
	title.textContent = movie.Title

	// Create the star element and add a click event listener
	const star = document.createElement('span');
	star.classList.add('star');
	star.textContent = '★';
	star.addEventListener('click', e => {
		e.stopPropagation();
		toggleFavorite(movie);
	});

	// Add the filled class if the movie is a favorite
	if (isFavorite) {
		star.classList.add('filled');
	};
	
	// Append the title and star to the bottom wrapper
	bottomWrapper.appendChild(title);
	bottomWrapper.appendChild(star);

	// Append the poster and bottom wrapper to the movie card
	movieCard.appendChild(poster);
	movieCard.appendChild(bottomWrapper);

	// Append the movie card to the container
	container.appendChild(movieCard);
}

/* 
 * Render a list of movies to the DOM
 */
export function renderMovieList(movieList) {
	console.log('Rendering movie list');

	const container = document.getElementById('cardContainer');

	// Clear the container before rendering
	for (const child of container.children) {
		child.remove();
	};
	
	movieList.forEach(movie => {
		const isFavorite = store.favoriteMovies.some(favMovie => favMovie.imdbID === movie.imdbID);
		createMovieCard(movie, isFavorite);
	});
};

/*
 * Delete a card from the DOM based on its index
 *
 * Note: This function is only used on the favorites page
 */
export function deleteCard(index) {	
	console.log('Deleting card from DOM');

	const container = document.getElementById('cardContainer');
	container.children[index].remove();
};