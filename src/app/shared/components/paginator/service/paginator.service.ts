import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import {  map } from 'rxjs';


/**
 * Servicio global para la gestión y sincronización del estado de paginación (`PaginatorService`).
 * 
 * Escucha de manera reactiva el parámetro de consulta `page` de la URL activa
 * y provee utilidades para reiniciar o corregir la página en caso de desbordamiento.
 */  
@Injectable({
  providedIn: 'root'
})
export class PaginatorService {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /**
   * Signal reactiva que obtiene el número de página actual directamente del query parameter `page`.
   * 
   * Valida si el parámetro es numérico y mayor a 0; de lo contrario, devuelve `1` por defecto.
   */
  readonly currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map(params => {
        const pageParam = params.get('page');
        const pageNumber = Number(pageParam);

        if (!pageParam || isNaN(pageNumber) || pageNumber <= 0) {
          this.router.navigate([], {
            queryParams: { page: undefined },
            queryParamsHandling: 'merge'
          });
          return 1
        } else {
          return pageNumber
        }
      })
    ),
    { initialValue: 1 }
  );

  /**
   * Evalúa si la página actual excede el límite total de páginas del recurso cargado.
   * Si es mayor, reajusta automáticamente la URL a la página 1.
   * 
   * @param resourcePages Número total de páginas que retornó la API para el recurso actual.
   */
  resetCurrentPageIfGreaterThanResourcePages(resourcePages: number | undefined): void {
    if (resourcePages && resourcePages < this.currentPage()) {
      this.reset();
    }
  }

  /**
   * Restablece el parámetro de consulta `page` en la URL a `1`,
   * manteniendo el resto de los query params intactos (`queryParamsHandling: 'merge'`).
   */
  reset(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 1 },
      queryParamsHandling: 'merge'
    });
  }

}
