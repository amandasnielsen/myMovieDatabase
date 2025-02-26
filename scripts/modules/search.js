import { fetchMovies } from './api.js';
import { renderMovieList } from './movieCard.js';

export function initSearch() {
	const searchForm = document.getElementById('searchForm');
	const searchInput = document.getElementById('searchInput');
	const searchDescription = document.querySelector('.search-description');
	const searchInformation = document.querySelector('.search-information');
	const query = new URLSearchParams(window.location.search).get('query');

	searchForm?.addEventListener('submit', (e) => {
		e.preventDefault();
		const query = searchInput.value.trim();

		if (query.length > 2) {
			window.location.href = `search.html?query=${query}`;
		}
	})

	if (window.location.pathname.includes('search.html') && query) {
		fetchMovies(query).then(movies => {
			if (movies?.length) {
				searchDescription.textContent = `Here are the top results for "${query}"`;
				searchInformation.classList.remove('d-none');

				renderMovieList(movies);
			} else {
				searchDescription.textContent = `No results found for "${query}"`;
			}
		}).catch(console.error);
	};
};