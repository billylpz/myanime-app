import { Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginatorService } from '../../../shared/components/paginator/service/paginator.service';
import { DbzService } from '../../services/dbz.service';
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";
import { DbzMenuButtonsComponent } from "../../components/menu-buttons/menuButtons/dbz-menuButtons.component";
import { TittleComponent } from "../../../shared/components/tittle/tittle.component";
import { DbzCharacterCardComponent } from '../../components/card/character-card/dbz-character-card.component';

@Component({
  selector: 'app-dbz-home-page',
  templateUrl: './dbz-home-page.component.html',
  styleUrls: ['./dbz-home-page.component.css'],
  imports: [PaginatorComponent, DbzCharacterCardComponent, LoadingSpinnerComponent, DbzMenuButtonsComponent, TittleComponent]
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

}
