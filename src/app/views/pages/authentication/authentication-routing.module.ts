import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LoginV2Component} from './login-v2/login-v2.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LockscreenComponent} from './lockscreen/lockscreen.component';
import {Error404Component} from '../error/error-404/error-404.component';
import {Error500Component} from '../error/error-500/error-500.component';
import {LoginV3Component} from '../login/login-v3/login-v3.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {
        path       : 'login-x',
        component  : LoginComponent,
      },
      {
        path       : 'login-v2',
        component  : LoginV2Component,
      },
      {
        path       : 'login',
        component  : LoginV3Component,
      },
      {
        path       : 'sign-up',
        component  : SignUpComponent,
      },
      {
        path       : 'forgot-password',
        component  : ForgotPasswordComponent,
      },
      {
        path       : 'lockscreen',
        component  : LockscreenComponent,
      }
    ]
  }
];
