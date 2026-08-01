import { Routes } from '@angular/router';
import { DbzHomePageComponent } from './pages/dbz-home-page/dbz-home-page.component';
import { DbzCharacterByRacePageComponent } from './pages/dbz-character-by-race-page/dbz-character-by-race-page.component';
import { DbzPlanetsPageComponent } from './pages/dbz-planets-page/dbz-planets-page.component';

/**
 * Configuración de rutas secundarias para el módulo o sección de **Dragon Ball Z**.
 * 
 * Define la navegación interna de la sección, incluyendo la vista principal de personajes, 
 * el filtrado de personajes por raza, el catálogo de planetas y el redireccionamiento por comodín.
 * 
 * @type {Routes}
 */
const DragonBallRoutes: Routes = [
  /**
   * Ruta raíz de la sección de Dragon Ball Z.
   * Carga el catálogo o dashboard principal de personajes.
   */
  { 
    path: '', 
    component: DbzHomePageComponent 
  },

  /**
   * Ruta para el filtrado de personajes según su raza (Saiyan, Namekiano, Humano, etc.).
   */
  { 
    path: 'characters-by-race', 
    component: DbzCharacterByRacePageComponent 
  },

  /**
   * Ruta para la vista general de planetas del universo Dragon Ball.
   */
  { 
    path: 'planets', 
    component: DbzPlanetsPageComponent 
  },

  /**
   * Ruta comodín (`**`): Redirige cualquier segmento no coincidente hacia la ruta principal.
   * 
   * @note Si la ruta principal es `''`, asegúrate de que el destino `'characters'` exista 
   * en el enrutador padre o ajústalo según el alias del path padre.
   */
  { 
    path: '**', 
    redirectTo: '' 
  },
];

/** Exportación por defecto requerida para la carga perezosa (*Lazy Loading*) en Angular. */
export default DragonBallRoutes;