import { applyFilters } from './filters.js';

export function initEvents() {
    document.getElementById("search-input").addEventListener("input", applyFilters);
    document.getElementById("filter-category").addEventListener("change", applyFilters);
}
