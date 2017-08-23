import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FcHeaderComponent } from './fc-header/fc-header.component';
import { FcFooterComponent } from './fc-footer/fc-footer.component';
import { FcSelecaoAnoComponent } from './fc-selecao-ano/fc-selecao-ano.component';
import { FcNavigationComponent } from './fc-navigation/fc-navigation.component';
import { FcSelecaoCategoriasComponent } from './fc-selecao-categorias/fc-selecao-categorias.component';
import { FcHomeComponent } from './fc-home/fc-home.component';

import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    FcHeaderComponent,
    FcFooterComponent,
    FcSelecaoAnoComponent,
    FcNavigationComponent,
    FcSelecaoCategoriasComponent,
    FcHomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
