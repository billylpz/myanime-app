import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { delay, map, Observable, of, tap } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonResponse } from '../interfaces/pokemon-response';

/**
 * Opciones de configuración para las peticiones de listado y búsqueda de Pokémon.
 */
interface Options {
  /** Cantidad de elementos por página. Por defecto es 12. */
  limit?: number;
  /** Desplazamiento inicial para la paginación de la API. */
  offset?: number;
  /** Término de búsqueda para filtrar Pokémon por nombre. */
  term?: string;
  /** Índice de la página actual para el cálculo de paginación local. */
  page?: number;
}

/**
 * Servicio encargado de la comunicación con la PokeAPI.
 * 
 * Gestiona la obtención, filtrado, paginación en el cliente y almacenamiento
 * en caché dentro de `sessionStorage` para los datos de Pokémon.
 */
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  /** URL base de la PokeAPI obtenida desde las variables de entorno. */
  private url = environment.URL_API_POKEMON;
  
  /** Cliente HTTP de Angular inyectado mediante `inject()`. */
  private http = inject(HttpClient);

  /**
   * Obtiene una lista paginada de Pokémon.
   * 
   * Implementa un mecanismo de caché en `sessionStorage` según la combinación 
   * de `limit` y `offset` para evitar peticiones redundantes a la API.
   * 
   * @param options Configuración de paginación (`limit` y `offset`).
   * @returns `Observable` con la lista de Pokémon en un objeto `PokemonResponse`.
   */
  getPokemons(options: Options): Observable<PokemonResponse> {
    const { limit = 12, offset = 0 } = options;
    let params = new HttpParams().append("limit", limit).append("offset", offset);

    const key = `pokemon-${limit}-${offset}`;

    if (sessionStorage.getItem(key)) {
      const pokemonResponse = JSON.parse(sessionStorage.getItem(key) || "{}");
      return of(pokemonResponse).pipe(delay(300));
    }

    return this.http.get<PokemonResponse>(`${this.url}/pokemon`, { params: params }).pipe(
      delay(300),
      tap(res => sessionStorage.setItem(key, JSON.stringify(res)))
    );
  }

  /**
   * Realiza una búsqueda filtrada de Pokémon por coincidencia de nombre.
   * 
   * Consulta el catálogo global de la API, aplica un filtro por el término de búsqueda 
   * y fragmenta los resultados localmente para simular paginación sobre las coincidencias.
   * 
   * @param options Parámetros de búsqueda (`term`, `limit` y `paramsPage`).
   * @returns `Observable` con el total de coincidencias y los resultados segmentados.
   */
  searchPokemonsByName(options: Options): Observable<PokemonResponse> {
    const { limit = 12, offset = 0, term = '', page = 0 } = options;
    let paramsHttp = new HttpParams().append("limit", 100000).append("offset", 0);
    return this.http.get<PokemonResponse>(`${this.url}/pokemon`, { params: paramsHttp }).pipe(
      delay(300),
      map(res => {
        const results = res.results.filter((p: any) =>
          p.name.includes(term)
        );

        return {
          count: results.length,
          results: results.slice(
            page * limit,
            page * limit + limit
          )
        } as PokemonResponse;
      })
    );
  }

  /**
   * Obtiene la información detallada de un Pokémon por su nombre.
   * 
   * Transforma la respuesta del servidor extrayendo las propiedades esenciales 
   * (sprites, tipos, habilidades, movimientos, sonidos) hacia la interfaz `Pokemon`.
   * 
   * @param name Nombre o identificador único del Pokémon.
   * @returns `Observable` con la entidad `Pokemon` estructurada.
   */
  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}/pokemon/${name}`)
      .pipe(
        map(response => {
          return {
            name: response.name,
            order: response.order,
            weight: response.weight,
            abilities: response.abilities,
            cries: response.cries,
            moves: response.moves,
            sprites: {
              front_default: response.sprites.front_default,
              back_default: response.sprites.back_default,
              front_female: response.sprites.front_female,
              back_female: response.sprites.back_female,
              front_shiny: response.sprites.front_shiny,
              back_shiny: response.sprites.back_shiny,
              front_shiny_female: response.sprites.front_shiny_female,
              back_shiny_female: response.sprites.back_shiny_female,
            },
            types: response.types,
          };
        })
      );
  }

}