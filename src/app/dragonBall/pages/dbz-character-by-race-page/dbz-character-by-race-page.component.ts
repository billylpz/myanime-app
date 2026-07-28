import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DbzService } from '../../services/dbz.service';
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";
import { CharacterCardComponent } from "../../components/card/character-card/character-card.component";
import { MenuButtonsComponent } from "../../components/menu-buttons/menuButtons/menuButtons.component";
import { TittleComponent } from "../../../shared/components/tittle/tittle.component";

@Component({
  selector: 'app-dbz-character-by-page',
  templateUrl: './dbz-character-by-race-page.component.html',
  styleUrls: ['./dbz-character-by-race-page.component.css'],
  imports: [LoadingSpinnerComponent, CharacterCardComponent, MenuButtonsComponent, TittleComponent]
})
export class DbzCharacterByRacePageComponent{

   races = signal(['Human', 'Saiyan', 'Namekian', 'Majin', 'Frieza Race', 'Android', 'Jiren Race',
    'God', 'Angel', 'Evil', 'Nucleico', 'Nucleico benigno', 'Unknown']);

  race = signal('Human')
  title = "Characters By"
  dbzService = inject(DbzService);

  dbzResource = rxResource({
    params: () => ({ race: this.race() }),
    stream: ({ params }) => {
      return this.dbzService.getCharactersByRace({ race: params.race })
    }
  });

  characters = computed(() => {
    return this.dbzResource.value();
  });

  filtrar(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.race.set(select.value);

  }

}
