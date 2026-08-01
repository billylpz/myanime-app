import { Character } from "./character";

/**
 * Representa la entidad de un planeta dentro del universo de Dragon Ball Z.
 * 
 * Incluye metadatos descriptivos, estado de destrucción en la trama y 
 * la lista opcional de personajes asociados que provienen de dicho planeta.
 */
export interface Planet {
    id: number;
    name: string;
    isDestroyed: boolean;
    description: string;
    image: string;
    deletedAt: null;
    characters?: Character[];
}
