import { Component } from '@angular/core';

/**
 * Componente de carga visual (*Skeleton Loader*) para las tarjetas de Pokémon.
 * 
 * Renderiza la silueta animada con la misma estructura y dimensiones de `PokemonCardComponent`
 * mientras `rxResource` resuelve la petición HTTP a la API.
 */
@Component({
  selector: 'pokemon-card-skeleton',
  templateUrl: './pokemon-card-skeleton.component.html',
  styleUrls: ['./pokemon-card-skeleton.component.css']
})
export class PokemonCardSkeletonComponent {

}