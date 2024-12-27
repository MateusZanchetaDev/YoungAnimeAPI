const api = document.querySelector('.details-main');

function GetApiDetailsAnime() {
    const animeId = localStorage.getItem('animeId');
    if (!animeId) {
        api.innerHTML = '<p>Anime não encontrado!</p>';
        return;
    }

    fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }

            const data = await res.json();
            const anime = data.data;

            let project = document.createElement('section');
            project.classList.add('anime-details');

            let title = document.createElement('h2');
            title.textContent = anime.title;

            let img = document.createElement('img');
            img.src = anime.images.jpg.large_image_url;
            img.alt = anime.title;

            let synopsis = document.createElement('p');
            synopsis.textContent = anime.synopsis;

            let trailer = document.createElement('div');
            trailer.classList.add('trailer');

            if (anime.trailer?.embed_url) {
                trailer.innerHTML = `
                    <h3></h3>
                    <iframe 
                        width="1160" 
                        height="528" 
                        src="${anime.trailer.embed_url}" 
                        title="Trailer do Anime ${anime.title}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>`;
            } 
            else { trailer.innerHTML = '<p>Trailer não disponível.</p>'; }

            project.appendChild(title);
            project.appendChild(img);
            project.appendChild(synopsis);
            project.appendChild(trailer);

            api.appendChild(project);
        })
        .catch(err => {
            api.innerHTML = '<p>Erro ao carregar os detalhes do anime.</p>';
            console.error(err);
        });
}

GetApiDetailsAnime();
