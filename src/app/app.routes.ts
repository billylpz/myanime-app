import { Routes } from '@angular/router';

/**
 * Configuración de las rutas principales de la aplicación.
 * 
 * - La ruta raíz (`""`) realiza una carga perezosa (*lazy loading*) de las rutas del módulo `home`.
 * - La ruta comodín (`"**"`) redirige cualquier ruta no encontrada hacia la raíz.
 */
export const routes: Routes = [
    {
        path: "",
        loadChildren: () => import('./home/home.routes'),
    },
    {
        path: '**',
        redirectTo: ''
    }
];