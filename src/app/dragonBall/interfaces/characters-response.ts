import { Character } from './character';
import { Links, Meta } from './api-response';

/**
 * Estructura de respuesta principal paginada del API para la consulta de personajes.
 */
export interface CharactersResponse {
    items: Character[];
    meta: Meta;
    links:Links;
}

