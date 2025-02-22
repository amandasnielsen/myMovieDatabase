// export function getFavorites () {
//     const storedFavorites = localStorage.getItem("favoriteMovie");
//     return storedFavorites ? JSON.parse(storedFavorites) : [];
// }

// export function saveFavorites(favoriteMovies) {
//     localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
// }

// export function displayFavorites() {
//     const favoritesContainer = document.getElementById("favorites-container");
//     const favoriteMovies = getFavorites();

//     while (favoritesContainer.firstChild) {
//         favoritesContainer.removeChild(favoritesContainer.firstChild);
//     }

//     if (favoriteMovies.length === 0) {
//         const noFavoritesText = document.createElement("p");
//         noFavoritesText.textContent = "You have no favorite movies :(";
//         favoritesContainer.appendChild(noFavoritesText);
//         return;
//     }

//     favoriteMovies.forEach(movie => {
//         const movieCard = document.createElement("div");
//         movieCard.classList.add("movie-card");
//         movieCard.setAttribute("data-title", movie.Title);

//         const poster = document.createElement("img");
//         poster.classList.add("movie-card__poster");
//         poster.src = movie.Poster;
//         poster.alt = movie.Title;

//         const title = document.createElement("h3");
//         title.classList.add("movie-card__title");
//         title.textContent = movie.Title;

//         const star = document.createElement("span");
//         star.classList.add("star", "filled");
//         star.textContent = "★";
//         star.addEventListener("click", () => removeFavorite(movie.Title));

//         movieCard.appendChild(poster);
//         movieCard.appendChild(title);
//         movieCard.appendChild(star);

//         favoritesContainer.appendChild(movieCard);
//     });
// }

// export function removeFavorite(title) {
//     let favoriteMovies = getFavorites();
//     favoriteMovies = favoriteMovies.filter(movie => movie.Title !== title);
//     saveFavorites(favoriteMovies);
//     displayFavorites();
// }