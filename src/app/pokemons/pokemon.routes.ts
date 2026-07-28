import { Routes } from '@angular/router';
import PokemonHomePageComponent from './pages/pokemon-home-page/pokemon-home-page.component';
import { PokemonViewPageComponent } from './pages/pokemon-view-page/pokemon-view-page.component';

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
]

export default pokemonRoutes;