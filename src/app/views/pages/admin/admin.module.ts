import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../../../core/shared.module';
import {AdminResolver} from './admin.resolver';
import {AdminIdResolver} from './adminId.resolver';
import {ManageAdminComponent} from './manage-admin/manage-admin.component';
import {CreateAdminComponent} from './create-admin/create-admin.component';

const routes = [
    {
        path        : 'create',
        component   :  CreateAdminComponent,
    },
    {
        path       : 'manage',
        component  : ManageAdminComponent,
        resolve: { admins: AdminResolver }
    },
    {
      path: 'manage/:id',
      component: CreateAdminComponent,
      resolve: { admin: AdminIdResolver }
    }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CreateAdminComponent, ManageAdminComponent],
  providers: [AdminResolver, AdminIdResolver]
})
export class AdminModule { }
