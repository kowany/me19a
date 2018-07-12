import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// angularfire2

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

// enviroments

import { environment } from './../environments/environment';

import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
