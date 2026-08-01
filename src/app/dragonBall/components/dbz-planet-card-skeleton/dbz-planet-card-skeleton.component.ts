import { Component } from '@angular/core';

/**
 * Componente visual de carga (*Skeleton Loader*) para `DbzPlanetCardComponent`.
 * 
 * Mantiene la estructura y dimensiones de la tarjeta de planeta mostrando
 * marcadores de posición animados mientras se realiza la carga asíncrona de datos.
 * 
 * @example
 * ```html
 * @if (planetsResource.isLoading()) {
 *   <dbz-planet-card-skeleton />
 * }
 * ```
 */
@Component({
  selector: 'dbz-planet-card-skeleton',
  templateUrl: './dbz-planet-card-skeleton.component.html',
  styleUrls: ['./dbz-planet-card-skeleton.component.css']
})
export class DbzPlanetCardSkeletonComponent {
  // Componente de presentación sin estado ni lógica interna.
}