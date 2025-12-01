export class SearchBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <input type="text" id="search-input" placeholder="Buscar vídeos..." aria-label="Buscar vídeos">
        `;
    }
}

export class CategoryFilter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <select id="filter-category" aria-label="Filtrar por categoria">
                <option value="">Todas as categorias</option>
                <option value="Documentário">Documentário</option>
                <option value="Tutorial">Tutorial</option>
                <option value="Curso">Curso</option>
            </select>
        `;
    }
}

customElements.define("search-bar", SearchBar);
customElements.define("category-filter", CategoryFilter);
