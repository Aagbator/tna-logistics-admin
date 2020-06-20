import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../../../core/shared.module';
import {CreateAdminComponent} from './create-admin/create-admin.component';
import { MyAccountComponent } from './my-account.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes = [
    {
        path        : '',
        component   :  MyAccountComponent,
        children: [
          // {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          {
            path        : '',
            component: ProfileComponent
          },
          {
            path        : 'change-password',
            component: ChangePasswordComponent
          }
        ]
    },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CreateAdminComponent, MyAccountComponent, ProfileComponent, ChangePasswordComponent],
})
export class MyAccountModule { }
