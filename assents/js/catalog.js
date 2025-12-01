import { setFullCatalog, applyFilters } from './filters.js';
import { initEvents } from './events.js';

export async function loadCatalog() {
    const spinner = document.getElementById("loading-spinner");
    const catalogContainer = document.getElementById("catalog-container");

    if (spinner) spinner.classList.remove("hidden");
    if (catalogContainer) catalogContainer.innerHTML = ""; // Limpar conteúdo enquanto carrega

    try {
        const response = await fetch("./assents/data/videos.json");

        if (!response.ok) throw new Error("Erro ao carregar catálogo");

        const json = await response.json();
        
        // Validação básica dos dados
        const validatedVideos = (json.videos || []).filter(video => {
            return video.title && video.thumbnail && video.videoUrl && video.year && video.category && video.description;
        });

        if (validatedVideos.length === 0 && (json.videos && json.videos.length > 0)) {
            console.warn("Nenhum vídeo válido encontrado após a validação.");
            if (catalogContainer) catalogContainer.innerHTML =
                "<p>Não há vídeos válidos para exibir. O catálogo pode estar corrompido ou vazio.</p>";
            return; // Interromper se não houver vídeos válidos
        }

        setFullCatalog(validatedVideos);

        applyFilters(); // Renderiza o catálogo inicial e aplica filtros se houver
        initEvents();

    } catch (err) {
        console.error("Erro ao carregar catálogo:", err);
        if (catalogContainer) catalogContainer.innerHTML =
            "<p>Não foi possível carregar o catálogo de vídeos. Por favor, tente novamente mais tarde.</p><p>Detalhes do erro: " + err.message + "</p>";
    } finally {
        if (spinner) spinner.classList.add("hidden");
    }
}
