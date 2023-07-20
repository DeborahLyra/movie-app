const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=feb3cd07db33054c3c0cc247463278b0&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=feb3cd07db33054c3c0cc247463278b0&query="'

const form = document.querySelector('#form');
const search = document.querySelector('#search');
const main = document.querySelector('#main')

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results)
}

function showMovies(movies) {

    main.innerHTML = ''

    movies.forEach(movie => {
        const { overview, title, poster_path, vote_average } = movie;

        const movieEl = document.createElement('div');

        movieEl.classList.add('movie');

        movieEl.innerHTML = `

        <img src="${IMG_PATH + poster_path}"
                alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if (vote >= 8){
        return 'green'
    } else if (vote < 8 && vote > 6) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== 0) {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})