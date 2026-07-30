import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { PaginatorService } from '../../../shared/service/paginator/paginator.service';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { TittleComponent } from "../../../shared/components/tittle/tittle.component";
import { PokemonCardSkeletonComponent } from "../../components/pokemon-card-skeleton/pokemon-card-skeleton.component";
import { PaginatorSkeletonComponent } from "../../../shared/components/paginator-skeleton/paginator-skeleton.component";

@Component({
  selector: 'app-pokemon-home-page',
  templateUrl: './pokemon-home-page.component.html',
  styleUrls: ['./pokemon-home-page.component.css'],
  imports: [RouterModule, PokemonCardComponent, PaginatorComponent, TittleComponent, PokemonCardSkeletonComponent, PaginatorSkeletonComponent]
})
export default class PokemonHomePageComponent {
  readonly title = 'List of Pokémons';

  private service = inject(PokemonService)
  paginatorService = inject(PaginatorService);
  router = inject(Router);

  limit = signal(12);
  apiCount = computed(() => this.pokemonResource.value()?.count ?? 0);
  totalPages = computed(() => Math.ceil(this.apiCount() / this.limit()))

  search = signal('');

  onSearch(term: string) {
    this.search.set(term.toLowerCase().trim());
    this.router.navigate([])
  }


  pokemonResource = rxResource({
    params: () => ({
      page: this.paginatorService.currentPage() - 1,
      search: this.search()
    }),
    stream: ({ params }) => {

      // Caso A: si search no está vacío → búsqueda local
      if (params.search.length > 0) {
        return this.service.searchPokemonsByName({
          offset: params.page * this.limit(),
          paramsPage: params.page,
          term: params.search
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
