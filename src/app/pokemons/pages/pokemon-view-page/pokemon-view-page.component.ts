import { Component, computed, effect, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CommonModule, TitleCasePipe } from '@angular/common';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Image, ImagesCarouselComponent } from "../../../shared/components/images-carousel/images-carousel.component";
import { TittleComponent } from "../../../shared/components/tittle/tittle.component";
import { PokemonNamePipe } from '../../pipes/pokemon-name/pokemon-name.pipe';
import { PokemonTypeColorPipe } from '../../pipes/pokemon-type/pokemon-type-color.pipe';

/**
 * Componente de la vista de detalle de un Pokémon (`PokemonViewPageComponent`).
 * 
 * Lee de forma reactiva el parámetro de la URL (`:name`), consulta los datos detallados 
 * mediante `rxResource`, maneja la redirección en caso de error y transforma dinámicamente 
 * las imágenes de los *sprites* mediante `computed()` para su presentación en un carrusel.
 */
@Component({
  selector: 'app-pokemon-view-page',
  templateUrl: './pokemon-view-page.component.html',
  styleUrls: ['./pokemon-view-page.component.css'],
  imports: [
    ImagesCarouselComponent, 
    PokemonNamePipe, 
    PokemonTypeColorPipe, 
    TitleCasePipe,
    CommonModule, 
    TittleComponent
  ]
})
export class PokemonViewPageComponent {
  /** Servicio para realizar consultas sobre la PokeAPI. */
  private service = inject(PokemonService);
  
  /** Servicio de enrutamiento para redirigir si ocurre un error de consulta. */
  private router = inject(Router);
  
  /** Acceso a la ruta activa para capturar los parámetros de la URL. */
  private activatedRoute = inject(ActivatedRoute);
  
  /** Instancia para la reproducción de archivos de audio de rugidos (*cries*). */
  private audio = new Audio();

  /** Título por defecto de la página para el encabezado principal. */
  readonly title: string = 'Pokémon Info';

  /**
   * Signal reactiva que extrae el parámetro `:name` de la URL activa.
   * Si no se especifica ningún nombre en la ruta, toma `'bulbasaur'` por defecto.
   */
  pokemonName = toSignal(
    this.activatedRoute.paramMap.pipe(
      map((params) => params.get("name") ?? 'bulbasaur')
    ),
  );

  /**
   * Recurso reactivo (`rxResource`) que consulta el detalle del Pokémon 
   * cada vez que el Signal `pokemonName()` cambia.
   */
  pokemonResource = rxResource({
    params: () => ({ pokemonName: this.pokemonName() }),
    stream: ({ params }) => this.service.getPokemonByName(params.pokemonName!)
  });

  /**
   * Efecto reactivo que detecta si `pokemonResource` falló (por ejemplo, nombre inválido o 404)
   * y redirige automáticamente al usuario de regreso a la lista principal de Pokémon.
   */
  errorEffect = effect(() => {
    if (this.pokemonResource.error()) {
      this.router.navigate(['/pokemon']);
    }
  });

  /**
   * Reproduce el sonido (*cry*) del Pokémon deteniendo cualquier reproducción previa.
   * 
   * @param url Enlace directo al archivo de audio del rugido del Pokémon.
   */
  playCry(url: string | undefined) {
    if (url) {
      this.audio.pause();
      this.audio.src = url;
      this.audio.currentTime = 0;
      this.audio.play().catch((e) => { 
        console.log(e); 
      });
    }
  }

  /**
   * Signal calculada (`computed`) que transforma la estructura de *sprites* recibida 
   * en un arreglo de objetos `Image` ({ key, value }) para el componente del carrusel.
   * 
   * Filtra las propiedades nulas para mostrar únicamente imágenes válidas.
   */
  pokemonImages = computed(() => {
    const data = this.pokemonResource.value();
    if (!data || !data.sprites) return [];

    return Object.entries(data.sprites)
      .filter(([_, value]) => value !== null)
      .map(([key, value]): Image => ({ key, value }));
  });

}