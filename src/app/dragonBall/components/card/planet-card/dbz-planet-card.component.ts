import { Component, input, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Planet } from '../../../interfaces/planet-interface';
import { DbzPlanetModalComponent } from '../../modal/planet-modal/dbz-planet-modal.component';

@Component({
  selector: 'dbz-planet-card',
  templateUrl: './dbz-planet-card.component.html',
  styleUrls: ['./dbz-planet-card.component.css'],
  imports: [TitleCasePipe, DbzPlanetModalComponent]
})
export class DbzPlanetCardComponent {
  planet = input.required<Planet>();

  openModal = signal<boolean>(false);

  planetProperties(planet: Planet) {
    return Object.entries(planet)
      .filter(([key]) =>
        key !== 'image' &&
        key !== 'deletedAt' &&
        key !== 'id'
      )
      .map(([key, value]) => ({ key, value }));
  }

}
