import { Links, Meta } from "./api-response";
import { Planet } from "./planet";

/**
 * Estructura de respuesta paginada devuelta por el API al consultar el catálogo de planetas.
 */
export interface PlanetResponse {
    items: Planet[];
    meta:  Meta;
    links: Links;
}

