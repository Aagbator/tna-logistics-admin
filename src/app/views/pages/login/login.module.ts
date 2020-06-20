import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../../core/shared.module';
import {LoginV3Component} from './login-v3/login-v3.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginV3Component
      }
    ]),
    SharedModule
  ],
  declarations: [LoginV3Component]
})
export class LoginModule {
}
