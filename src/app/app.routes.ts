import { Routes } from '@angular/router';
import { NotificationsHistoryComponent } from './notifications-history/notifications-history.component';
import { TramitesCrudComponent } from './tramites-crud/tramites-crud.component';
import { TarjetasContadoresComponent } from './tarjetas-contadores/tarjetas-contadores.component';
import { TarjetasSociedadesComponent } from './tarjetas-sociedades/tarjetas-sociedades.component';
import { CrearNotificacionComponent } from './crear-notificacion/crear-notificacion.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'historial',
    pathMatch: 'full'
  },
  {
    path: 'historial',
    component: NotificationsHistoryComponent
  },
  {
    path: 'crud',
    component: TramitesCrudComponent
  },
  
  // Rutas semánticas reales
  {
    path: 'tarjetas-contadores',
    component: TarjetasContadoresComponent
  },
  {
    path: 'sociedades',
    component: TarjetasSociedadesComponent
  },
  {
    path: 'crear-notificacion',
    component: CrearNotificacionComponent
  },
  {
    path: 'reportes',
    component: PlaceholderComponent
  },
  {
    path: 'certificados',
    component: PlaceholderComponent
  },
  {
    path: 'branding',
    component: PlaceholderComponent
  },
  {
    path: 'validador-qr',
    component: PlaceholderComponent
  },
  {
    path: 'auditoria',
    component: PlaceholderComponent
  },
  {
    path: 'usuarios',
    component: PlaceholderComponent
  },

  // Ruta genérica fallback por si acaso
  {
    path: 'construccion',
    component: PlaceholderComponent
  },
  {
    path: '**',
    redirectTo: 'tarjetas-contadores'
  }
];

