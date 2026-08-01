import { Component, computed, effect, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginatorService } from '../../../shared/service/paginator/paginator.service';
import { DbzService } from '../../services/dbz.service';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { TittleComponent } from '../../../shared/components/tittle/tittle.component';
import { DbzCharacterCardComponent } from '../../components/dbz-character-card/dbz-character-card.component';
import { PaginatorSkeletonComponent } from '../../../shared/components/paginator-skeleton/paginator-skeleton.component';
import { DbzMenuButtonsComponent } from '../../components/dbz-menu-buttons/dbz-menu-buttons.component';
import { DbzCharacterCardSkeletonComponent } from '../../components/dbz-character-card-skeleton/dbz-character-card-skeleton.component';

/**
 * Componente principal de la página de personajes de Dragon Ball Z.
 * 
 * Gestiona el listado paginado de personajes mediante `rxResource`, integrando
 * la sincronización del estado de paginación mediante `PaginatorService` y la
 * renderización de esqueletos de carga (*Skeletons*).
 * 
 * @example
 * RUTA: `/dbz`
 */
@Component({
  selector: 'app-dbz-home-page',
  templateUrl: './dbz-home-page.component.html',
  styleUrls: ['./dbz-home-page.component.css'],
  imports: [
    PaginatorComponent, 
    DbzCharacterCardComponent, 
    DbzMenuButtonsComponent, 
    TittleComponent, 
    PaginatorSkeletonComponent, 
    DbzCharacterCardSkeletonComponent
  ]
})
export class DbzHomePageComponent {
  /** 
   * Título principal de la página. 
   */
  readonly title = 'Dragon Ball Characters';

  /** 
   * Servicio inyectado para realizar peticiones sobre el API de Dragon Ball. 
   */
  private readonly service = inject(DbzService);

  /** 
   * Servicio inyectado para gestionar el estado de la paginación global o local. 
   */
  readonly paginationService = inject(PaginatorService);

  /**
   * Recurso reactivo (`rxResource`) que obtiene la lista paginada de personajes 
   * automáticamente cada vez que cambia la página en `paginationService.currentPage()`.
   */
  readonly dbzResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => this.service.getCharacters({ page: params.page })
  });

  /**
   * Signal calculada (`computed`) que extrae el listado de personajes (`items`) 
   * de la respuesta entregada por `dbzResource`.
   */
  readonly characters = computed(() => {
    return this.dbzResource.value()?.items ?? [];
  });

/**
   * Signal calculada que obtiene el total de páginas disponibles.
   */
  readonly totalPages = computed(() => {
    return this.dbzResource.value()?.meta.totalPages ?? 1;
  });

  /**
   * Efecto reactivo que valida y reinicia la página actual si el usuario 
   * intenta navegar a una página superior al total de páginas disponibles.
   */
  private readonly currentPageGreaterThanResourcePagesEffect = effect(() => {
    // 💡 Usamos directamente la Signal calculada totalPages()
    this.paginationService.resetCurrentPageIfGreaterThanResourcePages(this.dbzResource.value()?.meta.totalPages);
  });

}