import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

/**
 * Componente reutilizable de paginación (`PaginatorComponent`).
 * 
 * Renderiza una barra de navegación con botones utilizando las clases de DaisyUI (`join`, `join-item`)
 * para navegar entre páginas mediante parámetros de consulta (`queryParams`).
 * 
 * @example
 * ```html
 * <paginator 
 *   [totalPages]="Resource.value()?.totalPages" 
 *   [currentPage]="Resource.value()?.page" 
 * />
 * ```
 */
@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  imports: [RouterLink]
})
export class PaginatorComponent {
  /** Número total de páginas disponibles devueltas por el recurso o servidor */
  readonly totalPages = input.required<number>();

  /** Índice de la página actual (basado en índice 0 enviado por la API/servidor) */
  readonly currentPage = input.required<number>();

}