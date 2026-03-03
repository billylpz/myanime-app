import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { delay, map, Observable, of, tap } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';
import { PokemonResponse } from '../interfaces/pokemon-response.interface';

 interface Options {
  limit?: number,
  offset?: number,
  term?: string,
  paramsPage?: number,
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url = environment.URL_API_POKEMON;
  private http = inject(HttpClient);

  getPokemons(options: Options): Observable<PokemonResponse> {
    const { limit = 12, offset = 0 } = options;
    let params = new HttpParams().append("limit", limit).append("offset", offset);

    const key=`pokemon-${limit}-${offset}`

    if(sessionStorage.getItem(key)){
      const pokemonResponse= JSON.parse(sessionStorage.getItem(key) || "{}")
      return of(pokemonResponse).pipe(delay(300));
    }

    return this.http.get<PokemonResponse>(`${this.url}/pokemon`, { params: params }).pipe(
      delay(300),
      tap(res=>sessionStorage.setItem(key,JSON.stringify(res)))
    )
  }

  searchPokemonsByName(options: Options): Observable<PokemonResponse> {
    const { limit = 12, offset = 0, term = '', paramsPage = 0 } = options;
    let paramsHttp = new HttpParams().append("limit", 100000).append("offset", 0);
    return this.http.get<PokemonResponse>(`${this.url}/pokemon`, { params: paramsHttp}).pipe(
      delay(300),
      map(res => {
        const results = res.results.filter((p: any) =>
          p.name.includes(term)
        );

        return {
          count: results.length,
          results: results.slice(
            paramsPage * limit,
            paramsPage * limit + limit
          )
        } as PokemonResponse;

       
      })
    )
  }

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
              front_default:response.sprites.front_default,
              back_default:response.sprites.back_default,
              front_female:response.sprites.front_female,
              back_female:response.sprites.back_female,
              front_shiny:response.sprites.front_shiny,
              back_shiny:response.sprites.back_shiny,
              front_shiny_female:response.sprites.front_shiny_female,
              back_shiny_female:response.sprites.back_shiny_female,
            },
            types: response.types,
          }
        })

      );
  }

}