document.addEventListener('DOMContentLoaded', function() {
    // Fetch latest movies as an example
    fetch('http://localhost:3000/api/movies/now-playing?page=1')
        .then(response => response.json())
        .then(data => {
            // Create cards for each film
            const mainContent = document.getElementById('mainContent');
            data.forEach(film => {
                const card = document.createElement('div');
                card.classList.add('film-card');
                card.innerHTML = `
                <h3>${film.title}</h3>
                <p>${film.description}</p>
            `;
                mainContent.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});