import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DbzService } from '../../services/dbz.service';
import { DbzCharacterCardComponent } from '../../components/dbz-character-card/dbz-character-card.component';
import { TittleComponent } from '../../../shared/components/tittle/tittle.component';
import { DbzMenuButtonsComponent } from '../../components/dbz-menu-buttons/dbz-menu-buttons.component';
import { DbzCharacterCardSkeletonComponent } from '../../components/dbz-character-card-skeleton/dbz-character-card-skeleton.component';

/**
 * Página para el filtrado dinámico de personajes de Dragon Ball Z según su raza.
 * 
 * Gestiona el listado de razas disponibles mediante una Signal, realiza peticiones 
 * asíncronas con `rxResource` cada vez que la raza elegida cambia, y renderiza 
 * *Skeletons* de carga durante las transiciones.
 * 
 * @example
 * RUTA: `/dbz/characters-by-race`
 */
@Component({
  selector: 'app-dbz-character-by-page',
  templateUrl: './dbz-character-by-race-page.component.html',
  styleUrls: ['./dbz-character-by-race-page.component.css'],
  imports: [
    DbzCharacterCardComponent, 
    DbzMenuButtonsComponent, 
    TittleComponent, 
    DbzCharacterCardSkeletonComponent
  ]
})
export class DbzCharacterByRacePageComponent {
  /** 
   * Título principal visual de la página. 
   */
  readonly title = 'Characters By Race';

  /** 
   * Signal inmutable con el catálogo de razas disponibles para filtrar en el `<select>`. 
   */
  readonly races = signal<string[]>([
    'Human', 'Saiyan', 'Namekian', 'Majin', 'Frieza Race', 'Android', 
    'Jiren Race', 'God', 'Angel', 'Evil', 'Nucleico', 'Nucleico benigno', 'Unknown'
  ]);

  /** 
   * Signal con la raza seleccionada actualmente (inicializada en 'Human'). 
   */
  readonly race = signal<string>('Human');

  /** 
   * Servicio inyectado para consultar el API de Dragon Ball. 
   */
  private readonly dbzService = inject(DbzService);

  /**
   * Recurso reactivo (`rxResource`) que ejecuta la búsqueda de personajes 
   * automáticamente cada vez que la Signal `race()` se actualiza.
   */
  readonly dbzResource = rxResource({
    params: () => ({ race: this.race() }),
    stream: ({ params }) => this.dbzService.getCharactersByRace({ race: params.race })
  });

  /**
   * Signal calculada (`computed`) que extrae la lista de personajes obtenidos desde `dbzResource`.
   */
  readonly characters = computed(() => {
    return this.dbzResource.value() ?? [];
  });

  /**
   * Manejador del evento de cambio (`change`) del elemento `<select>`.
   * Actualiza la Signal `race` provocando la reejecución de `dbzResource`.
   * 
   * @param event Evento DOM nativo de cambio.
   */
  filtrar(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (select.value) {
      this.race.set(select.value);
    }
  }

}