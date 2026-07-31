import { Routes } from '@angular/router';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { HomePageComponent } from './pages/home-page.component';

/**
 * Configuración de rutas internas pertenecientes al módulo principal de la aplicación.
 * 
 * Utiliza `FrontLayoutComponent` como contenedor base (envolvente) para renderizar
 * dinámicamente las vistas hijas:
 * - `'home'`: Página principal de bienvenida.
 * - `'pokemon'`: Carga perezosa del módulo de Pokémon.
 * - `'dbz'`: Carga perezosa del módulo de Dragon Ball.
 * - `'**'`: Redirección por defecto hacia la vista `'home'`.
 */
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