import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Componente para la barra de navegación superior de la aplicación (*Navbar*).
 * 
 * Incluye soporte para menú desplegable responsive en dispositivos móviles y un selector 
 * para alternar el modo oscuro (*Dark Mode*).
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule]
})
export class NavbarComponent {

  /**
   * Alterna la clase `'dark'` en el elemento `<body>` para activar o desactivar 
   * el tema oscuro en toda la aplicación.
   */
  darkModeOnOff() {
    document.body.classList.toggle('dark');
  }
}