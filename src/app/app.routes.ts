import { RouterModule, Routes } from '@angular/router';
import { FcHomeComponent } from './fc-home/fc-home.component';
import { FcExercicioComponent } from './fc-exercicio/fc-exercicio.component';

const appRoutes: Routes = [
  { path: '', component: FcHomeComponent },
  { path: 'exercicio/:idTipoQuestao', component: FcExercicioComponent },
  // { path: 'cadastro', component: CadastroComponent },
  // { path: 'cadastro/:id', component: CadastroComponent },
  { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(appRoutes);
