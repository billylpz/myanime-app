import { TitleCasePipe } from '@angular/common';
import { Character } from '../../interfaces/character';
import { Component, computed, input, signal } from '@angular/core';
import { DbzCharacterModalComponent } from '../dbz-character-modal/dbz-character-modal.component';

/**
 * Componente de tarjeta para presentar la información básica de un personaje de Dragon Ball Z.
 * 
 * Utiliza Signals de Angular para gestionar las entradas (`input.required`),
 * filtrado dinámico de propiedades (`computed`) y el estado de visibilidad del modal de detalle (`signal`).
 * 
 * @example
 * ```html
 * <dbz-character-card [character]="character" />
 * ```
 */
@Component({
  selector: 'dbz-character-card',
  templateUrl: './dbz-character-card.component.html',
  styleUrls: ['./dbz-character-card.component.css'],
  imports: [TitleCasePipe, DbzCharacterModalComponent]
})
export class DbzCharacterCardComponent {
  /** 
   * Signal de entrada obligatoria que recibe el objeto `Character` a renderizar. 
   */
  readonly character = input.required<Character>();

  /** 
   * Signal de estado local para controlar la apertura/cierre del modal de detalles. 
   */
  readonly openModal = signal(false);

  /**
   * Signal calculada (`computed`) que transforma y filtra el objeto `Character`.
   * 
   * Convierte las entradas del objeto en pares `{ key, value }`, excluyendo 
   * campos internos o visuales como `'image'`, `'deletedAt'` e `'id'` para
   * renderizar dinámicamente el resto de atributos en la tarjeta.
   */
  readonly characterProperties = computed(() => {
    const excluded = ['image', 'deletedAt', 'id'];

    return Object.entries(this.character())
      .map(([key, value]) => ({ key, value }))
      .filter(({ key }) => !excluded.includes(key));
  });

  /**
   * Signal calculada (`computed`) que retorna la URL de la imagen del personaje.
   */
  readonly image = computed(() => {
    return this.character().image;
  });

}