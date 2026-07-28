import { Routes } from '@angular/router';
import { DbzHomePageComponent } from './pages/dbz-home-page/dbz-home-page.component';
import { DbzCharacterByRacePageComponent } from './pages/dbz-character-by-race-page/dbz-character-by-race-page.component';
import { DbzPlanetsPageComponent } from './pages/dbz-planets-page/dbz-planets-page.component';

const DragonBallRoutes: Routes = [
  {path: '', component: DbzHomePageComponent },
  { path: 'characters-by-race', component: DbzCharacterByRacePageComponent },
  { path: 'planets', component: DbzPlanetsPageComponent },
  { path: '**', redirectTo: 'characters' },
];

export default DragonBallRoutes;
