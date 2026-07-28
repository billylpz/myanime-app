import { Routes } from '@angular/router';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { HomePageComponent } from './pages/home-page.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: FrontLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
        title: 'Bienvenido a MyAnime APP'
      },
      {
        path: 'pokemon',
        loadChildren: () => import("../pokemons/pokemon.routes"),
        title: 'Pokémon API'
      },
      {
        path: 'dbz',
        loadChildren: () => import("../dragonBall/dragon-ball.routes"),
        title: 'DBZ API'
      },
      {
        path: "**",
        redirectTo: '/home'
      }
    ]
  },
];

export default homeRoutes;

