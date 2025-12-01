// assets/js/api.js
const DATA_PATH = './assets/data/videos.json';

/**
 * Carrega o catálogo de vídeos a partir do arquivo JSON.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de vídeos
 */
export async function fetchCatalog() {
  try {
    const response = await fetch(DATA_PATH);

    if (!response.ok) {
      throw new Error(`Erro ao carregar o catálogo: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.videos || []; // Assume que o JSON tem uma chave 'videos'
  } catch (error) {
    console.error("Falha na requisição do catálogo:", error);
    // Em caso de erro, retorna um array vazio para evitar quebrar a aplicação
    return [];
  }
}
