import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutes } from './authentication-routing.module';
import {RouterModule} from '@angular/router';
import {CardModule} from '../../../core/components/card/card.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SubheaderModule} from '../../layout/components/subheader/subheader.module';
import {LoginComponent} from './login/login.component';
import {LoginV2Component} from './login-v2/login-v2.component';
import {LockscreenComponent} from './lockscreen/lockscreen.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {SignUpComponent} from './sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubheaderModule,
  ],
  declarations: [
    LoginComponent,
    LoginV2Component,
    LockscreenComponent,
    ForgotPasswordComponent,
    SignUpComponent
  ]
})
export class AuthenticationModule {}
