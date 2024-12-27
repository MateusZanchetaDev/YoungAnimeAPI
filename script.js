const api = document.querySelector('.content-main');

function GetApiAnimesAndMangas() {
    fetch('https://api.jikan.moe/v4/seasons/2015/fall?sfw')
    .then(async res => {
        if(!res.ok){
            throw new Error(res.status);
        }

        let data = await res.json();

        const animes = data.data;

        animes.forEach(item => {

            let project = document.createElement('div');
            project.classList.add('anime-project');
            project.addEventListener('click', () => {
                localStorage.setItem('animeId', item.mal_id);
                window.location.href = 'details-anime.html';
            });

            let title = document.createElement('p');
            title.classList.add('title');
            title.textContent = item.title;

            let img = document.createElement('img');
            img.src = item.images.jpg.large_image_url;
            img.alt = item.title;

            let details = document.createElement('p');
            details.classList.add('details');
            details.textContent = item.synopsis;

            let genresContainer = document.createElement('div');
            genresContainer.classList.add('genres-container');
            
            let genresTitle = document.createElement('p');

            let genresList = document.createElement('ul');
            genresList.classList.add('genres-list');

            let maxGenres = 3;
            
            item.genres.slice(0, maxGenres).forEach(genre => {
                let genreItem = document.createElement('li');
                genreItem.textContent = genre.name;
                genresList.appendChild(genreItem);
            });

            genresContainer.appendChild(genresTitle);
            genresContainer.appendChild(genresList);

            let score = document.createElement('p');
            score.classList.add('score');
            score.innerHTML = `Score: <span>${item.score}</span>`;

            project.appendChild(title);
            project.appendChild(img);
            project.appendChild(details);
            project.appendChild(genresContainer);
            project.appendChild(score);

            api.appendChild(project);
        });
    });
}

GetApiAnimesAndMangas();