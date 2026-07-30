import { Component, computed, effect, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginatorService } from '../../../shared/service/paginator/paginator.service';
import { DbzService } from '../../services/dbz.service';
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { TittleComponent } from "../../../shared/components/tittle/tittle.component";
import { DbzCharacterCardComponent } from '../../components/dbz-character-card/dbz-character-card.component';
import { PaginatorSkeletonComponent } from "../../../shared/components/paginator-skeleton/paginator-skeleton.component";
import { DbzMenuButtonsComponent } from '../../components/dbz-menu-buttons/dbz-menuButtons.component';
import { DbzCharacterCardSkeletonComponent } from '../../components/dbz-character-card-skeleton/dbz-character-card-skeleton.component';

@Component({
  selector: 'app-dbz-home-page',
  templateUrl: './dbz-home-page.component.html',
  styleUrls: ['./dbz-home-page.component.css'],
  imports: [PaginatorComponent, DbzCharacterCardComponent, DbzMenuButtonsComponent, TittleComponent, PaginatorSkeletonComponent, DbzCharacterCardSkeletonComponent]
})
export class DbzHomePageComponent {
  service = inject(DbzService);
  paginationService = inject(PaginatorService)
  title = 'Dragon Ball Characters'

  dbzResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      return this.service.getCharacters({ page: params.page })
    }
  });

  characters = computed(() => {
    return this.dbzResource.value()?.items;
  });

  totalPages = computed(() => {
    return this.dbzResource.value()?.meta.totalPages!;
  });

  currentPageGreaterThanResourcePagesEffect = effect(() => {
    this.paginationService.resetCurrentPageIfGreaterThanResourcePages(this.dbzResource.value()?.meta.totalPages);
  });

}
