import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Pipe({
  name: 'pokemonName'
})
export class PokemonNamePipe implements PipeTransform {

  transform(value:Pokemon | undefined): string {
    if(value){
      return `#${value.order} ${value.name}`;
    }
    return '';
  }

}
