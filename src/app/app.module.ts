import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireModule} from '@angular/fire/compat';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';

import { CutePipe } from './pipes/cutePipe';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
            FormsModule,
            AngularFireAuthModule,
            AngularFireModule,
            provideFirebaseApp(()=> initializeApp(environment.firebaseConfig)),
            provideAuth(()=> getAuth()),
          ReactiveFormsModule,
          
        ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}],
  bootstrap: [AppComponent],
})
export class AppModule {}
