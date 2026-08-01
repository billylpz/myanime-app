import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';

/**
 * Pipe que formatea la representación visual del nombre de un Pokémon.
 * 
 * Recibe un objeto de tipo `Pokemon` (o `undefined`) y devuelve una cadena
 * con su número de Pokédex y su nombre en formato `#N Nombre` (ej. `#1 bulbasaur`).
 */
@Pipe({
  name: 'pokemonName'
})
export class PokemonNamePipe implements PipeTransform {

  /**
   * Transforma el objeto Pokémon recibido en un string formateado con su número de orden.
   * 
   * @param value Entidad `Pokemon` a formatear o `undefined` si los datos están cargando.
   * @returns Nombre formateado con su número de Pokédex o un string vacío si el valor es nulo.
   */
  transform(value: Pokemon | undefined): string {
    if (value) {
      return `#${value.order} ${value.name}`;
    }
    return '';
  }

}