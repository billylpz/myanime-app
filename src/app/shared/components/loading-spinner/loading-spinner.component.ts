import { Component } from '@angular/core';

/**
 * Componente reutilizable para mostrar un indicador visual de carga (*spinner*).
 * 
 * Se utiliza durante procesos asíncronos o peticiones HTTP para notificar al usuario 
 * que la información está en proceso de obtención.
 */
@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

}