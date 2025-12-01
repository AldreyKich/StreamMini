import { fetchCatalog } from './api.js';
import { truncate } from './helpers.js';
import './components.js';

let CURRENT_CATALOG = [];
let FILTERED_CATALOG = [];

// Renderiza um card individual
function renderVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';

    card.innerHTML = `
        <img src="${video.thumbnail}" alt="${video.title}">
        <h3>${truncate(video.title, 30)}</h3>
        <p>${video.year} | ${video.category}</p>
    `;

    return card;
}

// Renderiza o catálogo completo
function renderCatalog(list) {
    const container = document.getElementById('catalog-container');
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>Nenhum vídeo encontrado.</p>";
        return;
    }

    list.forEach(video => {
        container.appendChild(renderVideoCard(video));
    });
}

// Função principal
async function init() {
    console.log("StreamMini inicializando...");

    CURRENT_CATALOG = await fetchCatalog();
    FILTERED_CATALOG = [...CURRENT_CATALOG];

    renderCatalog(FILTERED_CATALOG);

    // Busca
    document.getElementById("search-input").addEventListener("input", e => {
        const term = e.target.value.toLowerCase();
        FILTERED_CATALOG = CURRENT_CATALOG.filter(v =>
            v.title.toLowerCase().includes(term)
        );
        renderCatalog(FILTERED_CATALOG);
    });

    // Filtro
    document.getElementById("filter-category").addEventListener("change", e => {
        const category = e.target.value;

        FILTERED_CATALOG = category
            ? CURRENT_CATALOG.filter(v => v.category === category)
            : [...CURRENT_CATALOG];

        renderCatalog(FILTERED_CATALOG);
    });
}

init();
