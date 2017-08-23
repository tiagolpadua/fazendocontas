import { RouterModule, Routes } from '@angular/router';
import { FcHomeComponent } from './fc-home/fc-home.component';
const appRoutes: Routes = [
  { path: '', component: FcHomeComponent },
  // { path: 'cadastro', component: CadastroComponent },
  // { path: 'cadastro/:id', component: CadastroComponent },
  { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(appRoutes);
