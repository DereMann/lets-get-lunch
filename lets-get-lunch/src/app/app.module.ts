import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule, LocalStorageService } from 'ngx-webstorage';

import { JwtModule } from '@auth0/angular-jwt';
import { NavbarComponent } from './navbar/navbar.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth/auth.guard';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core'
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('ngx-webstorage|authorization');
        }
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMaps,
      libraries: ['places']
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    {  // tell the DI to use our interceptor for HTTP interception
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
