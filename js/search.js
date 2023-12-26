async function fetchSearchResults(query, page, containerClass) {
    const TMDB_AUTH_TOKEN = "f1abd4ebd24b4591245c41c076422929";
    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_AUTH_TOKEN}&query=${query}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        const carousel = document.querySelector(`.${containerClass}`);
        carousel.innerHTML = '';  // Clear existing content

        data.results.forEach(movie => {
                const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                const carouselImage = document.createElement('div');
                carouselImage.classList.add('carouselImagesearch');
                carouselImage.setAttribute('id', movie.id);

                const imgElement = document.createElement('img');
                imgElement.classList.add('imgMovie');
                imgElement.setAttribute('src', imageUrl);

                carouselImage.appendChild(imgElement);
                carousel.appendChild(carouselImage);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

let currentPage = 1;
let currentQuery = '';

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', function () {
    currentQuery = document.getElementById('searchInput').value;
    currentPage = 1;
    fetchSearchResults(currentQuery, currentPage, 'searchResultsContainer').then(carousel_search);
});

// Event listener for the search input for real-time search
document.getElementById('searchInput').addEventListener('input', function () {
    currentQuery = document.getElementById('searchInput').value;
    currentPage = 1;
    fetchSearchResults(currentQuery, currentPage, 'searchResultsContainer').then(carousel_search);
    if(currentQuery.length !== 0){
        let SliderHome = document.querySelector('#slider');
        SliderHome.classList.add('hidden');
        let heroSection = document.querySelector('.heroSection');
        heroSection.classList.add('hidden');
        let mainContent = document.querySelector('.mainContent');
        mainContent.style.marginTop ='150px',
        buttonPn.style.display = 'block';
    
    }else{
        let SliderHome = document.querySelector('#slider');
        let heroSection = document.querySelector('.heroSection');
        SliderHome.classList.remove('hidden');
        heroSection.classList.remove('hidden');
        let mainContent = document.querySelector('.mainContent');
        mainContent.style.marginTop ='0px',
        buttonPn.style.display = 'none';
    }
    
});

document.getElementById('nextPageButton').addEventListener('click', function () {
    currentPage++;
    fetchSearchResults(currentQuery, currentPage, 'searchResultsContainer').then(carousel_search);
});

document.getElementById('prevPageButton').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        fetchSearchResults(currentQuery, currentPage, 'searchResultsContainer').then(carousel_search);
    }
});


function carousel_search() {
    const carousel = document.querySelectorAll('.carouselImagesearch');
    carousel.forEach(element => {
        document.getElementById(element.id).addEventListener('click', () => {
            console.log(element);
            openModal(element.id);
        })
    })
}