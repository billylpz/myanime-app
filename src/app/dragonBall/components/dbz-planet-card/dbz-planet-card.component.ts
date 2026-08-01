import { Component, computed, input, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Planet } from '../../interfaces/planet-interface';
import { DbzPlanetModalComponent } from '../dbz-planet-modal/dbz-planet-modal.component';

/**
 * Componente de tarjeta para representar visualmente la información de un planeta.
 * 
 * Filtra las propiedades internas (`id`, `image`, `deletedAt`) para mostrar únicamente
 * los atributos informativos del planeta y gestiona la apertura del modal con los personajes asociados.
 * 
 * @example
 * ```html
 * <dbz-planet-card [planet]="planet" />
 * ```
 */
@Component({
  selector: 'dbz-planet-card',
  templateUrl: './dbz-planet-card.component.html',
  styleUrls: ['./dbz-planet-card.component.css'],
  imports: [TitleCasePipe, DbzPlanetModalComponent]
})
export class DbzPlanetCardComponent {
  /** 
   * Signal de entrada obligatoria que recibe el objeto `Planet` a renderizar. 
   */
  readonly planet = input.required<Planet>();

  /** 
   * Signal de estado local para controlar la visibilidad del modal de personajes. 
   */
  readonly openModal = signal<boolean>(false);

  /**
   * Signal calculada (`computed`) que transforma y filtra el objeto `Planet`.
   * 
   * Extrae pares `{ key, value }` omitiendo campos internos o puramente visuales
   * como `'image'`, `'deletedAt'`, `'id'` y la colección de `'characters'`.
   */
  readonly planetProperties = computed(() => {
    const excluded = ['image', 'deletedAt', 'id', 'characters'];

    return Object.entries(this.planet())
      .filter(([key]) => !excluded.includes(key))
      .map(([key, value]) => ({ key, value }));
  });
}