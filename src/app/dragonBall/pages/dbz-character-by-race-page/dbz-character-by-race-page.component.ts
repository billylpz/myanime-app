import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DbzService } from '../../services/dbz.service';
import { DbzCharacterCardComponent } from "../../components/dbz-character-card/dbz-character-card.component";
import { TittleComponent } from "../../../shared/components/tittle/tittle.component";
import { DbzMenuButtonsComponent } from '../../components/dbz-menu-buttons/dbz-menuButtons.component';
import { DbzCharacterCardSkeletonComponent } from '../../components/dbz-character-card-skeleton/dbz-character-card-skeleton.component';

@Component({
  selector: 'app-dbz-character-by-page',
  templateUrl: './dbz-character-by-race-page.component.html',
  styleUrls: ['./dbz-character-by-race-page.component.css'],
  imports: [DbzCharacterCardComponent, DbzMenuButtonsComponent, TittleComponent, DbzCharacterCardSkeletonComponent]
})
export class DbzCharacterByRacePageComponent {

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
