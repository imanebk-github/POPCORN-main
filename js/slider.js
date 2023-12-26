async function fetchMovies(type, category, containerClass) {
    const TMDB_AUTH_TOKEN = "f1abd4ebd24b4591245c41c076422929";
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${category}/${type}?api_key=${TMDB_AUTH_TOKEN}`);
        const data = await response.json();
        const carousel = document.querySelector(`.${containerClass}`);
        data.results.forEach(movie => {

                if (movie.id && movie.poster_path && movie.backdrop_path) {
                    const imageUrl = `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`;
                    const carouselImage = document.createElement('div');
                    carouselImage.classList.add('carouselImage');
                    carouselImage.setAttribute('id', movie.id);

                    const imgElement = document.createElement('img');
                    imgElement.classList.add('imgMovie');
                    imgElement.setAttribute('src', imageUrl);

                    carouselImage.appendChild(imgElement);
                    carousel.appendChild(carouselImage);

                }
            
        });


        // Initialize Flickity
        const flkty = $(`.${containerClass}`).flickity({
            cellAlign: 'left',
            friction: 0.3,
            selectedAttraction: 0.1,
            autoPlay: getRandomDuration(),  // Set initial random duration
            wrapAround: true  // Enable infinite loop
        });

        // Function to get a random duration between 5 to 15 seconds
        function getRandomDuration() {
            return Math.floor(Math.random() * (1500 - 500 + 1)) + 5000;
        }

        // Update autoPlay duration on slide change
        flkty.on('change', function () {
            flkty.flickity('pausePlayer');  // Pause the current autoplay
            flkty.flickity('option', 'autoPlay', getRandomDuration());  // Update with new random duration
            flkty.flickity('playPlayer');  // Resume autoplay
        });


    } catch (error) {
        console.error("Error:", error);
    }
}

// Fetch Latest 2023 movies
fetchMovies('popular', 'movie', 'carouselOfLatest2023', 2023).then(carousel_slide);
fetchMovies('top_rated', 'movie', 'carouselOfTopRatedMovies').then(carousel_slide);
fetchMovies('upcoming', 'movie', 'carouselOfUpcomingMovies').then(carousel_slide);
fetchMovies('now_playing', 'movie', 'carouselOfNowPlayingMovies').then(carousel_slide);

// Fetch different types of TV shows
fetchMovies('popular', 'tv', 'carouselOfPopularTV').then(carousel_slide);
fetchMovies('top_rated', 'tv', 'carouselOfTopRatedTV').then(carousel_slide);
fetchMovies('on_the_air', 'tv', 'carouselOfOnTV').then(carousel_slide);

function carousel_slide(){
    const carousel = document.querySelectorAll('.carouselImage');
    carousel.forEach(element => {
        document.getElementById(element.id).addEventListener('click', () =>{
            openModal(element.id);
        })
    })
}



