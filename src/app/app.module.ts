import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SplashScreenService } from './core/services/splash-screen.service';
import { AppComponent } from './app.component';
import { BackdropComponent } from './core/components/backdrop/backdrop.component';

import { ConfigService } from './core/services/theme-config.service';
import {httpInterceptorProviders} from './core/interceptors/index';
import {AppCustomPreloader} from './core/app-custom-preloader.class';
import {SharedModule} from './core/shared.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  // suppressScrollX: true
};


@NgModule({
  declarations: [
    AppComponent,
    BackdropComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    LoadingBarModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    ConfigService,
    SplashScreenService,
    httpInterceptorProviders,
    AppCustomPreloader,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
