import { Component, computed, effect, inject} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginatorService } from '../../../shared/service/paginator/paginator.service';
import { DbzService } from '../../services/dbz.service';
import { TittleComponent } from "../../../shared/components/tittle/tittle.component";
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { DbzPlanetCardComponent } from "../../components/dbz-planet-card/dbz-planet-card.component";
import { DbzMenuButtonsComponent } from '../../components/dbz-menu-buttons/dbz-menuButtons.component';
import { DbzPlanetCardSkeletonComponent } from "../../components/dbz-planet-card-skeleton/dbz-planet-card-skeleton.component";
import { PaginatorSkeletonComponent } from "../../../shared/components/paginator-skeleton/paginator-skeleton.component";

@Component({
  selector: 'app-dbz-planets-page',
  templateUrl: './dbz-planets-page.component.html',
  styleUrls: ['./dbz-planets-page.component.css'],
  imports: [TittleComponent, DbzMenuButtonsComponent, PaginatorComponent, DbzPlanetCardComponent, DbzPlanetCardSkeletonComponent, PaginatorSkeletonComponent]
})
export class DbzPlanetsPageComponent  {
  service = inject(DbzService);
  paginationService = inject(PaginatorService);
  title='List of Planets';

  planetsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      return this.service.getPlanets({ page: params.page });
    }
  });


  totalPages = computed(() => {
    const totalPages = this.planetsResource.value()?.meta.totalPages!
    return totalPages
  });

  currentPageGreaterThanResourcePagesEffect = effect(() => {
    this.paginationService.resetCurrentPageIfGreaterThanResourcePages(this.planetsResource.value()?.meta.totalPages);
  });

}
