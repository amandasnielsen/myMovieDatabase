export async function fetchTopMovies() {
    try {
        const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
        
        if (!response.ok) {
            throw new Error(`HTTP-fel! Status: ${response.status}`);
        }

        let movies = await response.json();
        console.log("Filmer hämtade från API:", movies); // Kontrollera att vi får data

        return movies; // Returnerar datan istället för att använda oData
    } catch (error) {
        console.error("Fel vid hämtning av filmer:", error);
        return []; // Returnerar en tom array om något går fel
    }
}

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