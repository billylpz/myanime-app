/**
 * Estructura de la respuesta paginada emitida por la PokeAPI al listar Pokémon.
 */
export interface PokemonResponse {
    count: number
    next: string
    previous: null
    results:PokemonResult[]
}

/**
 * Representación simplificada de un Pokémon en la respuesta de listado.
 */
export interface PokemonResult{
    name:string,
    url:string
}