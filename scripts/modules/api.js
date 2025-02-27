// API for renderTrailers and showing top movies for recommendations
export async function fetchTopMovies() {
	console.log('Fetching top movies');

	try {
		const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
		return await response.json();
	} catch (err) {
		console.error('Error fetching movies:', err);
		return [];
	};
};

// API for the wide search for movies
const API_KEY = 'f695ea61';

export async function fetchMovies(query) {
	try {
		const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}*`);
		const data = await response.json();

		if (data.Response === "True") {
			return data.Search;
		} else {
			console.error('No movies found:', data.Error);
			return [];
		}
	} catch (err) {
		console.error('Error fetching movies:', err);
		return []; // Return an empty array if network-problems
	}
};

// API for the detailed search for movies
export async function fetchMovieDetails(imdbID) {
	try {
		const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&plot=full&i=${imdbID}`);
		return await response.json();
	} catch (err) {
		console.error('No movie found or error:', err);
		return null;
	};
};