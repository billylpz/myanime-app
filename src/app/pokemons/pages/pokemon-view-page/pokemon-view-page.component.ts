import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CommonModule, TitleCasePipe } from '@angular/common';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Image, ImagesCarouselComponent } from "../../../shared/components/images-carousel/images-carousel.component";
import { TittleComponent } from "../../../shared/components/tittle/tittle.component";
import { PokemonNamePipe } from '../../pipes/pokemon-name.pipe';
import { PokemonTypeColorPipe } from '../../pipes/pokemon-type-color.pipe';

@Component({
  selector: 'app-pokemon-view-page',
  templateUrl: './pokemon-view-page.component.html',
  styleUrls: ['./pokemon-view-page.component.css'],
  imports: [ImagesCarouselComponent, PokemonNamePipe, PokemonTypeColorPipe, TitleCasePipe,
    CommonModule, TittleComponent]
})
export class PokemonViewPageComponent {
  private service = inject(PokemonService);
  private activatedRoute = inject(ActivatedRoute);
  private audio = new Audio();

  title: string = 'Pokémon Info';

  pokemonName = toSignal(
    this.activatedRoute.paramMap.pipe(
      map((params) => {
        return params.get("name") ?? 'bulbasaur'
      })
    ),
  );

  pokemonResource = rxResource({
    params: () => ({ pokemonName: this.pokemonName() }),
    stream: ({ params }) => this.service.getPokemonByName(params.pokemonName!)
  })

  effects = effect(() => {

  }
  );

  playCry(url: string | undefined) {
    if (url) {
      this.audio.pause()
      this.audio.src = url;
      this.audio.currentTime = 0;
      this.audio.play().catch(() => { console.log("No se pudo reproducir el audio"); })
    }
  }

  pokemonImages = computed(() => {
    const data = this.pokemonResource.value();
    if (!data || !data.sprites) return [];

    return Object.entries(data.sprites)
      .filter(([_, value]) => value !== null)
      .map(([key, value]): Image => ({ key, value }))
    //.map(([key, value]) => ({ key, value } as ImagenPokemon)) //forma directa 
    // .map(({key,value}) => {
    //   let imagen :ImagenPokemon={ 
    //   key,
    //   value
    //   }
    //   return imagen
    // })
  });

  /**📌Object.entries() convierte un objeto así:
     * sprites: {
    front_default: "url1",
    front_shiny: "url2",
    back_default: null
  }
    en un arreglo así:
    [
    ["front_default", "url1"],
    ["front_shiny", "url2"],
    ["back_default", null]

    luego al mapearlo a objetos:
    [
      {"front_default":"www:url/image1.jpg"},
      {"back_default":"www:url/image2.jpg"},
      {"male_default":"www:url/image3.jpg"},
      {"female_default":"www:url/image4.jpg"},
    ]
  ]


   */




}
