import { Component, computed, effect, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DbzService } from '../../services/dbz.service';

/**
 * Componente modal para mostrar la información detallada de un planeta y sus personajes asociados.
 * 
 * Utiliza la etiqueta nativa `<dialog>` controlada dinámicamente mediante `viewChild`,
 * realiza peticiones asíncronas reactivas con `rxResource` y expone eventos de cierre al componente padre.
 * 
 * @example
 * ```html
 * <dbz-planet-modal [planetId]="planet.id" (close)="onCloseModal($event)" />
 * ```
 */
@Component({
  selector: 'dbz-planet-modal',
  templateUrl: './dbz-planet-modal.component.html',
  styleUrls: ['./dbz-planet-modal.component.css']
})
export class DbzPlanetModalComponent {
  /** 
   * Referencia al elemento nativo `<dialog>` de la plantilla HTML mediante `viewChild`. 
   */
  readonly modal = viewChild<ElementRef<HTMLDialogElement>>('modal');

  /** 
   * Emisor de eventos para notificar al componente padre cuando el modal se cierra. 
   */
  readonly close = output<boolean>();

  /** 
   * Signal de entrada obligatoria que especifica el ID del planeta a consultar. 
   */
  readonly planetId = input.required<number>();

  /** 
   * Servicio inyectado para realizar peticiones HTTP sobre el API de Dragon Ball. 
   */
  private readonly service = inject(DbzService);

  /**
   * Recurso reactivo (`rxResource`) que realiza la consulta del planeta 
   * de forma automática cada vez que cambia la Signal `planetId`.
   */
  readonly planetResource = rxResource({
    params: () => ({ planetId: this.planetId() }),
    stream: ({ params }) => this.service.getPlanet(params.planetId)
  });

  /**
   * Signal calculada (`computed`) que extrae la lista de personajes nativos o residentes 
   * del planeta obtenido a través de `planetResource`.
   */
  readonly planetCharacters = computed(() => {
    return this.planetResource.value()?.characters ?? [];
  });

  /**
   * Efecto reactivo que ejecuta la apertura del modal nativo (`showModal`)
   * tan pronto como se renderiza el componente.
   */
  private readonly openModalEffect = effect(() => {
    this.openModal();
  });

  /**
   * Abre la ventana modal interactiva mediante la API nativa de HTMLDialogElement.
   */
  openModal(): void {
    this.modal()?.nativeElement.showModal();
  }

  /**
   * Cierra la ventana modal mediante la API nativa y emite la señal de cierre (`false`) al padre.
   */
  closeModal(): void {
    this.modal()?.nativeElement.close();
    this.close.emit(false);
  }

}