export async function fetchTopMovies() {
    try {
        const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
        const data = await response.json();
        console.log("Fetched Movies:", data);
        return data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}

// API for the wide search for movies
const API_KEY = 'f695ea61';

export async function fetchMovies(query) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await response.json();
    
    if (data.Response === "True") {
        return data.Search;
    } else {
        console.error("No movies found or error:", data.Error);
        return [];
    }
}