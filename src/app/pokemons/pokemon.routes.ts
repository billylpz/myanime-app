import { Routes } from '@angular/router';
import PokemonHomePageComponent from './pages/pokemon-home-page/pokemon-home-page.component';
import { PokemonViewPageComponent } from './pages/pokemon-view-page/pokemon-view-page.component';

/**
 * Configuración de rutas internas para el módulo de Pokémon.
 * 
 * Mapea las siguientes vistas:
 * - `""`: Página principal del módulo (`PokemonHomePageComponent`), que muestra la lista/catálogo de Pokémon.
 * - `"view/:name"`: Vista de detalle (`PokemonViewPageComponent`), que recibe el parámetro del nombre del Pokémon en la URL.
 * - `"**"`: Redirección comodín hacia la vista principal del módulo.
 */
export const pokemonRoutes: Routes = [
    {
        path: "",
        component: PokemonHomePageComponent,
    },
    {
        path: "view/:name",
        component: PokemonViewPageComponent
    },
    {
        path: "**",
        redirectTo: ''
    }
];

export default pokemonRoutes;