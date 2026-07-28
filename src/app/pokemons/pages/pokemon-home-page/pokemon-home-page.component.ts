import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { PaginatorService } from '../../../shared/components/paginator/paginator.service';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { TittleComponent } from "../../../shared/components/tittle/tittle.component";

@Component({
  selector: 'app-pokemon-home-page',
  templateUrl: './pokemon-home-page.component.html',
  styleUrls: ['./pokemon-home-page.component.css'],
  imports: [RouterModule, LoadingSpinnerComponent, PokemonCardComponent, PaginatorComponent, TittleComponent]
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

}
