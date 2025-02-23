import { fetchMovieDetails } from "./api.js";

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('imdbID'); // Hämta imdbID från URL:en

    if (imdbID) {
        fetchMovieDetails(imdbID).then(movie => {
            if (movie) {
                displayMovieDetails(movie);
            } else {
                console.log('No movie details found.');
            }
        });
    }
});

export function displayMovieDetails(movie) {
    const movieTitle = document.getElementById('movieTitle');
    const moviePoster = document.getElementById('moviePoster');
    const moviePlot = document.getElementById('moviePlot');
    const movieYear = document.getElementById('movieYear');

    if (movieTitle) movieTitle.textContent = movie.Title;
    if (moviePoster) moviePoster.src = movie.Poster;
    if (moviePlot) moviePlot.textContent = movie.Plot;
    if (movieYear) movieYear.textContent = `Year: ${movie.Year}`;
}