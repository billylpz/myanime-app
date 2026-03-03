import { Component, computed,  inject, signal } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { PokemonService } from '../../services/pokemon.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { PaginatorService } from '../../../shared/components/paginator/paginator.service';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  imports: [PokemonCardComponent, PaginatorComponent, LoadingSpinnerComponent]
})
export class PokemonListComponent {
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





























  // private service = inject(PokemonService);

  // limit = signal(12);
  // offset = signal(0);

  // pokemonResource = rxResource({
  //   params: () => ({ limit: this.limit(), offset: this.offset() }),
  //   stream: ({ params }) =>
  //     this.service.getPokemons(params.limit, params.offset),
  // });

  // nextPage() {
  //   this.offset.update(o => o + this.limit());
  // }

  // prevPage() {
  //   this.offset.update(o => Math.max(0, o - this.limit()));
  // }

  // total = computed(() => this.pokemonResource.value()?.count ?? 0);

  // totalPages = computed(() =>
  //   Math.ceil(this.total() / this.limit())
  // );

  // currentPage = computed(() =>
  //   Math.floor(this.offset() / this.limit()) + 1
  // );

  // goToPage(page: number) {
  //   const p = Math.min(Math.max(page, 1), this.totalPages());
  //   this.offset.set((p - 1) * this.limit());
  // }

  // firstPage() {
  //   this.offset.set(0);
  // }

  // lastPage() {
  //   this.offset.set((this.totalPages() - 1) * this.limit());
  // }


}

/*

<div class="flex justify-center items-center gap-4 my-4">
  <span>
    Página {{ currentPage() }} de {{ totalPages() }}
  </span>
</div>

<!-- 🔹 BOTONES SUPERIORES -->
<div class="flex justify-center gap-2 mb-4">
  <button (click)="firstPage()" [disabled]="currentPage() === 1">
    ⏮ Primero
  </button>

  <button (click)="prevPage()" [disabled]="currentPage() === 1">
    ⬅ Anterior
  </button>

  <button (click)="nextPage()" [disabled]="currentPage() === totalPages()">
    Siguiente ➡
  </button>

  <button (click)="lastPage()" [disabled]="currentPage() === totalPages()">
    Último ⏭
  </button>
</div>
*/