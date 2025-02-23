import { toggleFavorite } from './favorites.js';

export function createMovieCard(movie, isFavorite) {
	const movieCard = document.createElement('div');
	movieCard.classList.add('movie-card');
	movieCard.setAttribute('data-title', movie.Title);

	const poster = document.createElement('img');
	poster.classList.add('movie-card__poster');
	poster.src = movie.Poster;
	poster.alt = movie.Title;

	const bottomWrapper = document.createElement('div');
	bottomWrapper.classList.add('movie-card__bottom-wrapper');

	const title = document.createElement('h3');
	title.classList.add('movie-card__title');
	title.textContent = movie.Title;

	const star = document.createElement('span');
	star.classList.add('star');

	if (isFavorite) {
		star.classList.add('filled');
	}

	star.textContent = '★';
	star.addEventListener('click', () => toggleFavorite(movie));
	
	bottomWrapper.appendChild(title);
	bottomWrapper.appendChild(star);

	movieCard.appendChild(poster);
	movieCard.appendChild(bottomWrapper);

	cardContainer.appendChild(movieCard);
}