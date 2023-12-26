
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modalContainer")
const openVote = document.querySelector("#openVote")
const firstThumb = document.querySelector(".firstThumb")
const closeRating = document.querySelector(".fa-circle-xmark")
const thumbUp = document.querySelector(".secondThumb")
const thumpDown = document.querySelector(".fa-thumbs-down")
//open the modal
const openModal = function (movieID) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  modalContainer.classList.remove("hidden");
  modalDOM(movieID)

};
firstThumb.addEventListener('click',() =>{
  openVote.style.display ="flex";
  openVote.style.transition ="0.4s";
})
const closeModalRating = function () {
  openVote.style.display ="none";
  openVote.style.transition ="0.4s";
};
closeRating.addEventListener('click',closeModalRating)
thumbUp.addEventListener('click',() => {
  thumbUp.classList.add("hopping");
  setTimeout(() => {
    thumbUp.classList.remove("hopping");
    closeModalRating();
  }, 500); 
})
thumpDown.addEventListener('click',() => {
  thumpDown.classList.add("hopping");
  setTimeout(() => {
    thumpDown.classList.remove("hopping");
    closeModalRating();
  }, 500); 
})
//close the modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modalContainer.classList.add("hidden");
};

async function fetchMovieById(movieId) {
  const TMDB_AUTH_TOKEN = "f1abd4ebd24b4591245c41c076422929";
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_AUTH_TOKEN}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

//card modal
async function modalDOM(movieID){

  await fetchMovieById(movieID).then(data => {

    const imgModal = document.getElementsByClassName('backdrop')[0];

    imgModal.id = data.id;  // Set ID from data


    if (data.backdrop_path === null){
      imgModal.setAttribute('src', `https://hips.hearstapps.com/hmg-prod/images/abstract-glitch-background-404-royalty-free-illustration-1679362904.jpg`);  
    }else{
      imgModal.setAttribute('src', `https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`);  // Set image src from data
    }

    const titleModal = document.getElementById('title');
    titleModal.textContent = data.title;  // Set title from data

    const genreModal = document.getElementById('genre');
    genreModal.textContent = data.genres.map(genre => genre.name).join(', ');  // Set genres from data

    const overviewModal = document.getElementById('overview');
    overviewModal.textContent = data.overview;  // Set overview from data

    const voteModal = document.getElementById('vote');
    voteModal.textContent = data.vote_average;  // Set vote average from data

    const voteCountModal = document.getElementById('voteCount');
    voteCountModal.textContent = data.vote_count;  // Set vote count from data
  });


  
  //close the modal
  const buttonModal= document.getElementsByClassName("btn-close")[0]
  buttonModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
}


