import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FcHeaderComponent } from './fc-header/fc-header.component';
import { FcFooterComponent } from './fc-footer/fc-footer.component';
import { FcSelecaoAnoComponent } from './fc-selecao-ano/fc-selecao-ano.component';
import { FcNavigationComponent } from './fc-navigation/fc-navigation.component';
import { FcHomeComponent } from './fc-home/fc-home.component';
import { FcDataService } from './fc-services/fc-data.services';

import { routing } from './app.routes';
import { FcSelecaoTipoComponent } from './fc-selecao-tipo/fc-selecao-tipo.component';
import { FcExercicioComponent } from './fc-exercicio/fc-exercicio.component';

@NgModule({
  declarations: [
    AppComponent,
    FcHeaderComponent,
    FcFooterComponent,
    FcSelecaoAnoComponent,
    FcNavigationComponent,
    FcHomeComponent,
    FcSelecaoTipoComponent,
    FcExercicioComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  providers: [FcDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
