import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

/**
 * Componente de diseño principal (*layout*) para la sección pública de la aplicación.
 * 
 * Modela la estructura base de la interfaz mediante la integración de una barra de navegación 
 * superior (`NavbarComponent`), una sección central dinámica (`RouterOutlet`) y un pie de página 
 * inferior (`FooterComponent`).
 */
@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.css'],
  imports: [NavbarComponent, FooterComponent, RouterOutlet]
})
export class FrontLayoutComponent {

}