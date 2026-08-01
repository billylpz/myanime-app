import { Component, computed, effect, inject} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginatorService } from '../../../shared/service/paginator/paginator.service';
import { DbzService } from '../../services/dbz.service';
import { TittleComponent } from "../../../shared/components/tittle/tittle.component";
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { DbzPlanetCardComponent } from "../../components/dbz-planet-card/dbz-planet-card.component";
import { DbzMenuButtonsComponent } from '../../components/dbz-menu-buttons/dbz-menu-buttons.component';
import { DbzPlanetCardSkeletonComponent } from "../../components/dbz-planet-card-skeleton/dbz-planet-card-skeleton.component";
import { PaginatorSkeletonComponent } from "../../../shared/components/paginator-skeleton/paginator-skeleton.component";

/**
 * Página principal para el catálogo de planetas del universo Dragon Ball Z.
 * 
 * Consume `DbzService` a través de un `rxResource` enlazado reactivamente a la página 
 * actual en `PaginatorService`. Muestra el paginador, esqueletos de carga y valida 
 * los límites de páginas.
 * 
 * @example
 * RUTA: `/dbz/planets`
 */
@Component({
  selector: 'app-dbz-planets-page',
  templateUrl: './dbz-planets-page.component.html',
  styleUrls: ['./dbz-planets-page.component.css'],
  imports: [
    TittleComponent, 
    DbzMenuButtonsComponent, 
    PaginatorComponent, 
    DbzPlanetCardComponent, 
    DbzPlanetCardSkeletonComponent, 
    PaginatorSkeletonComponent
  ]
})
export class DbzPlanetsPageComponent {
  /** 
   * Título de la página. 
   */
  readonly title = 'List of Planets';

  /** 
   * Servicio inyectado para las llamadas HTTP de Dragon Ball Z. 
   */
  private readonly service = inject(DbzService);

  /** 
   * Servicio inyectado para controlar el estado de la paginación. 
   */
  readonly paginationService = inject(PaginatorService);

  /**
   * Recurso reactivo (`rxResource`) que ejecuta la petición de planetas 
   * cada vez que cambia `paginationService.currentPage()`.
   */
  readonly planetsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => this.service.getPlanets({ page: params.page })
  });


  /**
   * Signal calculada (`computed`) que obtiene el total de páginas de metadatos,
   * retornando 1 por defecto mientras carga o si es undefined.
   */
  readonly totalPages = computed(() => {
     return this.planetsResource.value()?.meta.totalPages!
  });

 /**
   * Efecto reactivo que valida y reinicia la página actual si el usuario 
   * intenta navegar a una página superior al total de páginas disponibles.
   */
  private readonly currentPageGreaterThanResourcePagesEffect = effect(() => {
    this.paginationService.resetCurrentPageIfGreaterThanResourcePages(this.planetsResource.value()?.meta.totalPages);
  });

}
