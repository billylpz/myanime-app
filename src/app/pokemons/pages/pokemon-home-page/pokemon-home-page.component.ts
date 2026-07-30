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

@Component({
  selector: 'app-pokemon-home-page',
  templateUrl: './pokemon-home-page.component.html',
  styleUrls: ['./pokemon-home-page.component.css'],
  imports: [RouterModule, PokemonCardComponent, PaginatorComponent, TittleComponent, PokemonCardSkeletonComponent, PaginatorSkeletonComponent,
    ReactiveFormsModule
  ]
})
export default class PokemonHomePageComponent implements OnInit {
  readonly title = 'List of Pokémons';
  private destroyRef= inject(DestroyRef);
  private service = inject(PokemonService)
  paginatorService = inject(PaginatorService);
  router = inject(Router);

  limit = signal(12);
  apiCount = computed(() => this.pokemonResource.value()?.count ?? 0);
  totalPages = computed(() => Math.ceil(this.apiCount() / this.limit()))

  searchByName = signal('');
  searchByNameControl = new FormControl<string>('');

  ngOnInit(): void {
    this.searchByNameControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(value => {
      this.searchByName.set(value?.toLowerCase().trim() ?? '');
      this.router.navigate([])
    })
  }

  pokemonResource = rxResource({
    params: () => ({
      page: this.paginatorService.currentPage() - 1,
      searchByName: this.searchByName()
    }),
    stream: ({ params }) => {

      // Caso A: si search no está vacío → búsqueda local
      if (params.searchByName.length > 0) {
        return this.service.searchPokemonsByName({
          offset: params.page * this.limit(),
          paramsPage: params.page,
          term: params.searchByName
        })
      }

      // Caso B: búsqueda vacía → paginación normal
      return this.service.getPokemons({
        offset: params.page * this.limit()
      })
    }
  });

  currentPageGreaterThanResourcePagesEffect = effect(() => {
    this.paginatorService.resetCurrentPageIfGreaterThanResourcePages(this.totalPages());
  });

}
