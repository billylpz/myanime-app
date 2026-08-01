import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Componente de barra de navegación interna para la sección de Dragon Ball Z.
 * 
 * Renderiza un menú de botones interactivos para alternar entre las diferentes 
 * subrutas del módulo: catálogo general de personajes, catálogo de planetas 
 * y filtrado de personajes por raza.
 * 
 * @example
 * ```html
 * <dbz-menu-buttons />
 * ```
 */
@Component({
  selector: 'dbz-menu-buttons',
  templateUrl: './dbz-menu-buttons.component.html',
  styleUrls: ['./dbz-menu-buttons.component.css'],
  imports: [RouterLink]
})
export class DbzMenuButtonsComponent {
  // Componente puramente de navegación/presentacional sin estado mutable.
}