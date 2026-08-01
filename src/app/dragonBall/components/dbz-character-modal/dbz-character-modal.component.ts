import { Component, computed, effect, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TitleCasePipe } from '@angular/common';
import { DbzService } from '../../services/dbz.service';

/**
 * Componente modal para visualizar la información detallada de un personaje de Dragon Ball Z.
 * 
 * Presenta detalles avanzados como su planeta de origen (con filtrado dinámico de propiedades)
 * y el listado de sus transformaciones disponibles.
 * 
 * Utiliza la etiqueta HTML5 `<dialog>` controlada vía `viewChild`, peticiones asíncronas reactivas
 * con `rxResource` y emite un evento `output` al ser cerrado.
 * 
 * @example
 * ```html
 * <dbz-character-modal [characterId]="character.id" (close)="openModal($event)" />
 * ```
 */
@Component({
  selector: 'dbz-character-modal',
  templateUrl: './dbz-character-modal.component.html',
  styleUrls: ['./dbz-character-modal.component.css'],
  imports: [TitleCasePipe]
})
export class DbzCharacterModalComponent {
  /** 
   * Referencia al elemento nativo `<dialog>` de la plantilla HTML. 
   */
  readonly modal = viewChild<ElementRef<HTMLDialogElement>>('modal');

  /** 
   * Signal de entrada obligatoria que especifica el ID del personaje a consultar. 
   */
  readonly characterId = input.required<number>();

  /** 
   * Emisor de eventos para notificar al componente padre el cierre del modal. 
   */
  readonly close = output<boolean>();

  /** 
   * Servicio inyectado para realizar peticiones sobre el API de Dragon Ball. 
   */
  private readonly service = inject(DbzService);

  /**
   * Recurso reactivo (`rxResource`) que obtiene la información completa del personaje 
   * automáticamente cuando cambia `characterId`.
   */
  readonly characterResource = rxResource({
    params: () => ({ id: this.characterId() }),
    stream: ({ params }) => this.service.getCharacter(params.id)
  });

  /**
   * Signal calculada (`computed`) que transforma los datos del planeta de origen (`originPlanet`).
   * Convierte el objeto en pares `{ key, value }`, omitiendo valores nulos o campos visuales/internos (`id`, `image`).
   */
  readonly originPlanet = computed(() => {
    const originPlanet = this.characterResource.value()?.originPlanet;

    if (originPlanet) {
      return Object.entries(originPlanet)
        .map(([key, value]) => ({ key, value }))
        .filter((object) => object.value !== null && object.key !== 'id' && object.key !== 'image');
    }
    return [];
  });

  /**
   * Signal calculada (`computed`) que extrae la lista de transformaciones del personaje.
   */
  readonly transformationsArray = computed(() => {
    return this.characterResource.value()?.transformations ?? [];
  });

  /**
   * Efecto reactivo que dispara la apertura del modal nativo (`showModal`) al montarse.
   */
  private readonly openModalEffect = effect(() => {
    this.openModal();
  });

  /**
   * Abre la ventana modal mediante la API nativa de `HTMLDialogElement`.
   */
  openModal(): void {
    this.modal()?.nativeElement.showModal();
  }

  /**
   * Cierra la ventana modal mediante la API nativa y notifica al padre emitiendo `false`.
   */
  closeModal(): void {
    this.modal()?.nativeElement.close();
    this.close.emit(false);
  }

}