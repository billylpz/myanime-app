import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Componente para la página de inicio o bienvenida (*Home Page*).
 * 
 * Presenta el portal principal de la aplicación con tarjetas navegables hacia los 
 * distintos módulos disponibles.
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  imports: [RouterLink]
})
export class HomePageComponent {

}