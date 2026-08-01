import { Character } from './character-interface';

/**
 * Estructura de respuesta principal paginada del API para la consulta de personajes.
 */
export interface CharactersResponse {
    items: Character[],
    meta: Meta,
    links:Links
}

/**
 * Información de paginación y metadatos devueltos por el API.
 */
export interface Meta {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
}

/**
 * Enlaces HATEOAS/navegación de la respuesta paginada.
 */
export interface Links {
    first: string
    previous: string
    next: string
    last: string
}