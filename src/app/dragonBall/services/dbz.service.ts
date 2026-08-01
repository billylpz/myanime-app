import { CharactersResponse } from './../interfaces/characters-response';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { delay, Observable, of, tap } from 'rxjs';
import { Character } from '../interfaces/character-interface';
import { PlanetResponse } from '../interfaces/planet-response';
import { Planet } from '../interfaces/planet-interface';

/**
 * Opciones de filtrado y paginación para las consultas del API de Dragon Ball.
 */
interface DbzOptions {
  page?: number;
  limit?: number;
  race?: string;
}

/**
 * Servicio centralizado para la gestión y comunicación HTTP con el API de Dragon Ball Z.
 * 
 * Implementa estrategias de caché local temporal mediante `sessionStorage` 
 * para optimizar el rendimiento y reducir peticiones redundantes al servidor.
 */
@Injectable({
  providedIn: 'root'
})
export class DbzService {
  /** URL base del API obtenida desde las variables de entorno. */
  private readonly url = environment.URL_API_DBZ;

  /** Cliente HTTP de Angular*/
  private readonly http = inject(HttpClient);

  /**
   * Obtiene un listado paginado de personajes de Dragon Ball Z.
   * Utiliza caché en `sessionStorage` basada en la página y el límite solicitados.
   * 
   * @param options Opciones de paginación (`page` y `limit`).
   * @returns Un Observable con la respuesta paginada de personajes (`CharactersResponse`).
   */
  getCharacters(options: DbzOptions): Observable<CharactersResponse> {
    const { page = 0, limit = 10 } = options;
    const key = `dbz-characters-${page}-${limit}`;

    if (sessionStorage.getItem(key)) {
      const characterResponse = JSON.parse(sessionStorage.getItem(key) || '{}');
      return of(characterResponse).pipe(
        delay(100)
      );
    }

    return this.http.get<CharactersResponse>(`${this.url}/characters`, {
      params: { page, limit }
    }).pipe(
      tap((res) => sessionStorage.setItem(key, JSON.stringify(res))),
      delay(300)
    );
  }

  /**
   * Obtiene un listado de personajes filtrados por su raza.
   * Implementa caché local en `sessionStorage` por cada raza consultada.
   * 
   * @param options Opciones que incluyen la raza a filtrar (`race`, por defecto 'Human').
   * @returns Un Observable con un arreglo de objetos `Character`.
   */
  getCharactersByRace(options: DbzOptions): Observable<Character[]> {
    const { race = 'Human' } = options;
    const key = `dbz-characters-${race}`;

    if (sessionStorage.getItem(key)) {
      const characterResponse = JSON.parse(sessionStorage.getItem(key) || '{}');
      return of(characterResponse).pipe(
        delay(100)
      );
    }

    return this.http.get<Character[]>(`${this.url}/characters`, {
      params: { race }
    }).pipe(
      tap((res) => sessionStorage.setItem(key, JSON.stringify(res))),
      delay(300)
    );
  }

  /**
   * Obtiene el detalle completo de un personaje específico a partir de su ID.
   * 
   * @param id Identificador único del personaje.
   * @returns Un Observable con la entidad detallada del `Character`.
   */
  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.url}/characters/${id}`);
  }

  // ==========================================
  // PLANETS
  // ==========================================

  /**
   * Obtiene un listado paginado de los planetas del universo de Dragon Ball Z.
   * Implementa caché local en `sessionStorage` optimizada por página y límite.
   * 
   * @param options Opciones de paginación (`page` y `limit`).
   * @returns Un Observable con la respuesta paginada de planetas (`PlanetResponse`).
   */
  getPlanets(options: DbzOptions): Observable<PlanetResponse> {
    const { page = 0, limit = 10 } = options;
    const key = `dbz-planets-${page}-${limit}`;

    if (sessionStorage.getItem(key)) {
      const planetResponse = JSON.parse(sessionStorage.getItem(key) || '{}');
      return of(planetResponse);
    }

    return this.http.get<PlanetResponse>(`${this.url}/planets`, {
      params: { page, limit }
    }).pipe(
      tap((res) => sessionStorage.setItem(key, JSON.stringify(res)))
    );
  }

  /**
   * Obtiene el detalle de un planeta específico junto con sus personajes asociados.
   * 
   * @param id Identificador único del planeta.
   * @returns Un Observable con la entidad detallada del `Planet`.
   */
  getPlanet(id: number): Observable<Planet> {
    return this.http.get<Planet>(`${this.url}/planets/${id}`);
  }
}