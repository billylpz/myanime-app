import { Component, inject, input, OnDestroy } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { PokemonNamePipe } from "../../pipes/pokemon-name/pokemon-name.pipe";
import { PokemonTypeColorPipe } from "../../pipes/pokemon-type/pokemon-type-color.pipe";
import { RouterLink } from "@angular/router";
import { PokemonCardSkeletonComponent } from "../pokemon-card-skeleton/pokemon-card-skeleton.component";

/**
 * Componente que representa la tarjeta visual de un Pokémon individual.
 * 
 * Gestiona de forma reactiva la consulta del detalle del Pokémon (`rxResource`) según 
 * el nombre recibido por entrada (`inputName`), mostrando un estado de carga (*skeleton loader*), 
 * sus tipos, la imagen predeterminada y la reproducción de su sonido/rugido (*cry*).
 */
@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
  imports: [TitleCasePipe, PokemonNamePipe, PokemonTypeColorPipe, CommonModule, RouterLink, PokemonCardSkeletonComponent]
})
export class PokemonCardComponent implements OnDestroy {

  /**
   * Servicio para la gestión y consulta de la API de Pokémon.
   */
  private service = inject(PokemonService);

  /**
   * Nombre único o identificador del Pokémon a consultar.
   */
  readonly pokemonName = input.required<string>();

  /**
   * Instancia de reproducción de audio para ejecutar las llamadas de voz (*cries*).
   */
  private audio = new Audio();

  ngOnDestroy(): void {
    this.stop(); // Detiene la reproducción si la tarjeta se destruye o el usuario navega fuera
  }

  /**
   * Recurso reactivo (`rxResource`) que obtiene el detalle completo del Pokémon
   * automáticamente cada vez que el parámetro `inputName` cambia.
   */
  pokemonResource = rxResource({
    params: () => ({ pokemonName: this.pokemonName() }),
    stream: ({ params }) => this.service.getPokemonByName(params.pokemonName)
  });

  /**
   * Reproduce el archivo de audio (*cry*) correspondiente al Pokémon.
   * Si ya hay un sonido en ejecución, lo interrumpe y reproduce el nuevo.
   * 
   * @param url URL directa del archivo de audio del Pokémon.
   */
  playCry(url: string | undefined) {
    if (url) {
      this.audio.src = url;
      this.stop();
      this.audio.play().catch((e) => {
        console.error(e);
      });
    }
  }

  /**
   * Detiene de inmediato la reproducción actual de audio.
   */
  private stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

}