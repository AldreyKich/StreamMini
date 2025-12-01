// assets/js/helpers.js
/**
* Função de debounce para limitar a frequência de execução de uma função.
* Útil para eventos como 'input' em campos de busca.
* @param {Function} func - A função a ser executada.
* @param {number} delay - O tempo de espera em milissegundos.
* @returns {Function} - A função debounced.
*/
export const debounce = (func, delay) => {
let timeoutId;
return function(...args) {
clearTimeout(timeoutId);
timeoutId = setTimeout(() => {
func.apply(this, args);
}, delay);
};
};
/**
* Trunca uma string para um comprimento máximo, adicionando '...' se necess
* @param {string} text - O texto a ser truncado.
* @param {number} maxLength - O comprimento máximo.
* @returns {string} - O texto truncado.
*/
export const truncate = (text, maxLength) => {
if (text.length <= maxLength) return text;
return text.substring(0, maxLength) + '...';
};
// Outras funções de formatação virão aqui...