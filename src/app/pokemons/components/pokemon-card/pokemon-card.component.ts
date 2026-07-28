import { Component, inject, input} from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { PokemonNamePipe } from "../../pipes/pokemon-name/pokemon-name.pipe";
import { PokemonTypeColorPipe } from "../../pipes/pokemon-type/pokemon-type-color.pipe";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
  imports: [TitleCasePipe, PokemonNamePipe, PokemonTypeColorPipe, CommonModule, RouterLink]
})
export class PokemonCardComponent {
  private service = inject(PokemonService);
  inputName = input.required<string>();
  private audio = new Audio();

  pokemonResource = rxResource({
    params: () => ({ input: this.inputName() }),
    stream: ({ params }) => this.service.getPokemonByName(params.input)
  });

  
  playCry(url: string | undefined) {
    if(url){
      this.audio.pause();
      this.audio.src = url;
      this.audio.currentTime = 0;
      this.audio.play().catch(() => {});
    }
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

}
