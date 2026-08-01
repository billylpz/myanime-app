
/**
 * Estructura de respuesta paginada devuelta por el API al consultar el catálogo de planetas.
 */
export interface PlanetResponse {
    items: Item[];
    meta:  Meta;
    links: Links;
}

/**
 * Información detallada de un planeta retornado en el listado paginado.
 */
export interface Item {
    id:          number;
    name:        string;
    isDestroyed: boolean;
    description: string;
    image:       string;
    deletedAt:   null;
}

/**
 * Enlaces de navegación HATEOAS para desplazarse entre las páginas de resultados de planetas.
 */
export interface Links {
    first:    string;
    previous: string;
    next:     string;
    last:     string;
}

/**
 * Metadatos informativos sobre el estado de la paginación de planetas.
 */
export interface Meta {
    totalItems:   number;
    itemCount:    number;
    itemsPerPage: number;
    totalPages:   number;
    currentPage:  number;
}
