import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { PaginatorService } from '../../../shared/service/paginator/paginator.service';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { TittleComponent } from "../../../shared/components/tittle/tittle.component";
import { PokemonCardSkeletonComponent } from "../../components/pokemon-card-skeleton/pokemon-card-skeleton.component";
import { PaginatorSkeletonComponent } from "../../../shared/components/paginator-skeleton/paginator-skeleton.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

/**
 * Componente principal de catálogo para el módulo de Pokémon (`PokemonHomePageComponent`).
 * 
 * Gestiona el listado paginado y la búsqueda reactiva de Pokémon.
 * Incluye funcionalidades como:
 * - Búsqueda en tiempo real por término mediante un `FormControl` reactivo desfasado (`debounceTime`).
 * - Paginación dinámica apoyada por `PaginatorService` y computada según los registros devueltos.
 * - Alternancia automática entre consulta paginada habitual y filtrado local mediante `rxResource`.
 * - Reajuste de la página actual mediante `effect` cuando los límites son superados.
 */
@Component({
  selector: 'app-pokemon-home-page',
  templateUrl: './pokemon-home-page.component.html',
  styleUrls: ['./pokemon-home-page.component.css'],
  imports: [
    RouterModule, 
    PokemonCardComponent, 
    PaginatorComponent, 
    TittleComponent, 
    PokemonCardSkeletonComponent, 
    PaginatorSkeletonComponent,
    ReactiveFormsModule
  ]
})
export default class PokemonHomePageComponent implements OnInit {
  /** Título principal presentado en la cabecera. */
  readonly title = 'List of Pokémons';

  /** Referencia al ciclo de vida para destruir suscripciones activas de RxJS. */
  private destroyRef = inject(DestroyRef);

  /** Servicio de la PokeAPI para la obtención y búsqueda de Pokémon. */
  private service = inject(PokemonService);

  /** Servicio compartido encargado del estado global o local de la paginación. */
  paginatorService = inject(PaginatorService);

  /** Servicio de enrutamiento de Angular. */
  router = inject(Router);

  /** Límite de Pokémon mostrados por página. */
  limit = signal(12);

  /** Conteo total de Pokémon devuelto por la API según el filtro o la consulta activa. */
  apiCount = computed(() => this.pokemonResource.value()?.count ?? 0);

  /** Total de páginas calculadas a partir del conteo total y el límite por vista. */
  totalPages = computed(() => Math.ceil(this.apiCount() / this.limit()));

  /** Signal que almacena el término de búsqueda procesado. */
  searchByName = signal('');

  /** Control del formulario reactivo enlazado al campo de entrada de búsqueda. */
  searchByNameControl = new FormControl<string>('');

  /**
   * Suscribe la escucha reactiva sobre el campo de búsqueda.
   * Aplica un retardo de 1000ms (`debounceTime`) para limitar peticiones innecesarias
   * y actualiza el Signal `searchByName` con el texto normalizado en minúsculas.
   */
  ngOnInit(): void {
    this.searchByNameControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(value => {
      this.searchByName.set(value?.toLowerCase().trim() ?? '');
      this.router.navigate([]);
    });
  }

  /**
   * Recurso reactivo (`rxResource`) que ejecuta la petición HTTP.
   * Reacciona automáticamente a cambios en la página actual o el término de búsqueda (`searchByName`).
   * Alterna entre la búsqueda filtrada por nombre y la carga paginada tradicional.
   */
  pokemonResource = rxResource({
    params: () => ({
      page: this.paginatorService.currentPage() - 1,
      searchByName: this.searchByName()
    }),
    stream: ({ params }) => {
      // Caso A: Si existe término de búsqueda → invoca filtrado local
      if (params.searchByName.length > 0) {
        return this.service.searchPokemonsByName({
          offset: params.page * this.limit(),
          page: params.page,
          term: params.searchByName
        });
      }

      // Caso B: Consulta por defecto → obtiene la página correspondiente
      return this.service.getPokemons({
        offset: params.page * this.limit()
      });
    }
  });

  /**
   * Efecto reactivo que valida si la página seleccionada sobrepasa el total 
   * de páginas disponibles y reinicia el valor desde el `PaginatorService`.
   */
  currentPageGreaterThanResourcePagesEffect = effect(() => {
    this.paginatorService.resetCurrentPageIfGreaterThanResourcePages(this.totalPages());
  });

}