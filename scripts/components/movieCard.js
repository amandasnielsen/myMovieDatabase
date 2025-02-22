// export function createMovieCard(movie) {

//     topMovieList.forEach(movie => {
//         const movieCard = document.createElement('div');
//         movieCard.classList.add('movie-card');
//         movieCard.setAttribute('data-title', movie.Title);

//         const poster = document.createElement('img');
//         poster.classList.add('movie-card__poster');
//         poster.src = movie.Poster;
//         poster.alt = movie.Title;

//         const title = document.createElement('h3');
//         title.classList.add('movie-card__title');
//         title.textContent = movie.Title;

//         const star = document.createElement('span');
//         star.classList.add('star');
//         star.textContent = '★';
//         star.addEventListener('click', () => toggleFavorite(movie));

//         movieCard.appendChild(poster);
//         movieCard.appendChild(title);
//         movieCard.appendChild(star);

//         cardContainer.appendChild(movieCard);

//         updateStarColor(movie);
//     });
// }