import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EstudoComponent } from './pages/estudo/estudo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'estudo', component: EstudoComponent },
  { path: '**', redirectTo: '' },
];
