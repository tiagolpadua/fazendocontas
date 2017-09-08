import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ngx-bootstrap
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AlertModule } from 'ngx-bootstrap/alert';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

// https://github.com/PointInside/ng2-toastr
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

export class CustomOption extends ToastOptions {
  positionClass = 'toast-top-center';
}

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
    ToastModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    routing,
    // AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [FcDataService, FCExerciciosService,
    { provide: ToastOptions, useClass: CustomOption },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
