import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EstudoComponent } from './components/estudo/estudo.component';
import { EstudosListaComponent } from './pages/estudos-lista/estudos-lista.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'estudos/editar',
    component: EstudosListaComponent,
    data: { mode: 'editar' },
  },
  {
    path: 'estudos/consultar',
    component: EstudosListaComponent,
    data: { mode: 'consultar' },
  },
  {
    path: 'estudos/aprovar',
    component: EstudosListaComponent,
    data: { mode: 'aprovar' },
  },
  { path: 'estudo', component: EstudoComponent },
  { path: '**', redirectTo: '' },
];
