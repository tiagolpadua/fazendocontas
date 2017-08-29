import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ngx-bootstrap
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AlertModule } from 'ngx-bootstrap/alert';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FcHeaderComponent } from './fc-header/fc-header.component';
import { FcFooterComponent } from './fc-footer/fc-footer.component';
import { FcSelecaoAnoComponent } from './fc-selecao-ano/fc-selecao-ano.component';
import { FcNavigationComponent } from './fc-navigation/fc-navigation.component';
import { FcHomeComponent } from './fc-home/fc-home.component';
import { FcDataService } from './fc-services/fc-data.services';
import { FCExerciciosService } from './fc-services/fc-exercicios.services';

import { routing } from './app.routes';
import { FcExercicioComponent } from './fc-exercicio/fc-exercicio.component';

@NgModule({
  declarations: [
    AppComponent,
    FcHeaderComponent,
    FcFooterComponent,
    FcSelecaoAnoComponent,
    FcNavigationComponent,
    FcHomeComponent,
    FcExercicioComponent
  ],
  imports: [
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    BrowserModule,
    HttpModule,
    routing
  ],
  providers: [FcDataService, FCExerciciosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
