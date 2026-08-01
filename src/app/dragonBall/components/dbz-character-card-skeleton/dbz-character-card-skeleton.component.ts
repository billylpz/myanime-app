import { Component } from '@angular/core';

/**
 * Componente visual de carga (*Skeleton Loader*) para `DbzCharacterCardComponent`.
 * 
 * Simula la estructura visual de la tarjeta de personaje durante los estados 
 * de carga asíncrona (`rxResource.isLoading()`), mejorando la experiencia del usuario (UX).
 * 
 * @example
 * ```html
 * @if (characterResource.isLoading()) {
 *   <dbz-character-card-skeleton />
 * }
 * ```
 */
@Component({
  selector: 'dbz-character-card-skeleton',
  templateUrl: './dbz-character-card-skeleton.component.html',
  styleUrls: ['./dbz-character-card-skeleton.component.css']
})
export class DbzCharacterCardSkeletonComponent {
  // Componente puramente presentacional sin estado ni lógica interna.
}