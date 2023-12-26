const search_icon = document.getElementById("search_icon");
const searchText = document.getElementById("searchText");
const searchPopup = document.getElementById("searchPopup");
const searchMovieButton = document.getElementById("searchMovieButton");
const searchInput = document.getElementById("searchInput");
const close_icon = document.querySelector("#close_icon");
const buttonPn= document.querySelector('.buttonPN');

search_icon.addEventListener("click", () => {
    searchPopup.style.display = "block";
    search_icon.style.display = "none"
    close_icon.style.display = "block"

    searchInput.focus();
});

searchText.addEventListener("click", () => {
    searchPopup.style.display = "block";
    searchInput.focus();
});

searchMovieButton.addEventListener("click", () => {
    const searchTerm = searchInput.value;
    if (searchTerm.trim() !== "") {
        // Perform movie search using the searchTerm
        console.log(`Searching for movie: ${searchTerm}`);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        searchPopup.style.display = "none";
    }
});


    close_icon.addEventListener("click", function () {
        close_icon.style.display = "none"; // Show search button
        searchPopup.style.display = "none"
        search_icon.style.display = "block";
        let SliderHome = document.querySelector('#slider');
        SliderHome.classList.remove('hidden');
        buttonPn.style.display = 'none';
    });


// search.addEventListener("click", function() {
//     search.style.display = "none"; // Hide search button
//     close.style.display = "block"; // Show close button
// });