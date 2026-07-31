import { Component, input } from '@angular/core';

/**
 * Componente reutilizable para la presentación de títulos principales en las páginas.
 * 
 * Renderiza un encabezado (`<h1>`) centrado y adaptable a modo claro y oscuro, 
 * recibiendo el texto del título dinámicamente mediante un `input.required`.
 * 
 * @example
 * ```html
 * <app-tittle [title]="Bienvenido" />
 * ```
 */
@Component({
  selector: 'app-tittle',
  templateUrl: './tittle.component.html',
  styleUrls: ['./tittle.component.css']
})
export class TittleComponent {

  /**
   * Texto del título a mostrar en el encabezado de la vista.
   */
  readonly title = input.required<string>();

}
