
import { Routes } from '@angular/router';

import { Login } from './modulos/login/login';
import { Dashboard } from './modulos/dashboard/dashboard';
import { Clientes } from './modulos/clientes/clientes';
import { Facturas } from './modulos/facturas/facturas';
import { Pagos } from './modulos/pagos/pagos';
import { Reportes } from './modulos/reportes/reportes';
import { Notificaciones } from './modulos/notificaciones/notificaciones';
import { Usuarios } from './modulos/usuarios/usuarios';
import { Configuracion } from './modulos/configuracion/configuracion';
import { Main } from './estructura/main';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: Main,
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'clientes',
        component: Clientes
      },
      {
        path: 'facturas',
        component: Facturas
      },
      {
        path: 'pagos',
        component: Pagos
      },
      { path: 'reportes', component: Reportes },
      { path: 'notificaciones', component: Notificaciones },
      { path: 'usuarios', component: Usuarios },
      { path: 'configuracion', component: Configuracion }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

