import { renderCatalog } from './render.js';

export let FULL_CATALOG = [];

export function setFullCatalog(catalog) {
    FULL_CATALOG = catalog;
}

export function applyFilters() {
    const searchText = document.getElementById("search-input")?.value.toLowerCase() || "";
    const selectedCategory = document.getElementById("filter-category")?.value || "";

    const filtered = FULL_CATALOG.filter(video =>
        video.title.toLowerCase().includes(searchText) &&
        (!selectedCategory || video.category === selectedCategory)
    );

    renderCatalog(filtered);
}
