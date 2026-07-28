import { Component, computed, inject, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginatorService } from '../../../shared/components/paginator/paginator.service';
import { DbzService } from '../../services/dbz.service';
import { TittleComponent } from "../../../shared/components/tittle/tittle.component";
import { MenuButtonsComponent } from "../../components/menu-buttons/menuButtons/menuButtons.component";
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";
import { PlanetCardComponent } from "../../components/card/planet-card/planet-card.component";

@Component({
  selector: 'app-dbz-planets-page',
  templateUrl: './dbz-planets-page.component.html',
  styleUrls: ['./dbz-planets-page.component.css'],
  imports: [TittleComponent, MenuButtonsComponent, PaginatorComponent, LoadingSpinnerComponent, PlanetCardComponent]
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

}
