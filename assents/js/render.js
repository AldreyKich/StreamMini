import { truncate } from './utils.js';

export function renderVideoCard(video) {
    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
        <div class="video-thumbnail-wrapper"> <img src="${video.thumbnail}" alt="${video.title}">
        
            <div class="video-overlay" data-url="${video.videoUrl}">
                <div class="play-icon">▶</div>
            </div>
        </div>

        <h3>${video.title}</h3>
        <p>${video.year} | ${video.category}</p>
        <div class="video-description-wrapper">
            <p class="video-description-text">${video.description}</p>
            <button class="read-more-btn hidden">Ver Mais</button>
        </div>
    `;

    // Lógica para "Ver Mais"
    const descriptionText = card.querySelector('.video-description-text');
    const readMoreBtn = card.querySelector('.read-more-btn');

    // O botão "Ver Mais" será controlado na função renderCatalog após o card ser anexado ao DOM

    readMoreBtn.addEventListener('click', () => {
        descriptionText.classList.toggle('collapsed');
        if (descriptionText.classList.contains('collapsed')) {
            readMoreBtn.textContent = 'Ver Mais';
        } else {
            readMoreBtn.textContent = 'Ver Menos';
        }
    });

    // Clique no overlay abre o modal
    card.querySelector(".video-overlay").addEventListener("click", () => {
        // openVideoModal(video.videoUrl);
        const event = new CustomEvent('open-video-modal', {
            detail: { videoUrl: video.videoUrl }
        });
        document.dispatchEvent(event);
    });

    return card;
}

export function renderCatalog(list) {
    const container = document.getElementById("catalog-container");
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>Nenhum vídeo encontrado.</p>";
        return;
    }

    list.forEach(video => {
        const card = renderVideoCard(video);
        container.appendChild(card);

        // Verificar se o "Ver Mais" é necessário após o card ser anexado e o layout calculado
        const descriptionText = card.querySelector('.video-description-text');
        const readMoreBtn = card.querySelector('.read-more-btn');

        // Adicionar um pequeno atraso para garantir que o layout foi computado
        setTimeout(() => {
            if (descriptionText.scrollHeight > descriptionText.clientHeight) {
                readMoreBtn.classList.remove('hidden');
                descriptionText.classList.add('collapsed');
            } else {
                readMoreBtn.classList.add('hidden');
                descriptionText.classList.remove('collapsed');
            }
        }, 0);
    });
}
