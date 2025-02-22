const localStorageKeyFavorites = 'favoriteMovies';

// Favorite-movies
export function toggleFavorite(movie) {
	const favoriteIndex = favoriteMovies.findIndex(favMovie => favMovie.Title === movie.Title);

	if (favoriteIndex === -1) {
		favoriteMovies.push(movie);
	} else {
		favoriteMovies.splice(favoriteIndex, 1);
	}

	saveFavorites();    
	updateStarColor(movie);
}

// Saving favorite movies to localStorage
function saveFavorites() {
	localStorage.setItem(localStorageKeyFavorites, JSON.stringify(favoriteMovies));
}

// Getting favorite-movies from localStorage
export function populateFavorites () {
	const storedFavorites = localStorage.getItem(localStorageKeyFavorites);

	if (storedFavorites) {
		favoriteMovies.push(...JSON.parse(storedFavorites));
	}
}