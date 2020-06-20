import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateRoleComponent } from './create-role/create-role.component';
import {SharedModule} from '../../../core/shared.module';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import {RoleResolver} from './role.resolver';
import {RoleIdResolver} from './roleId.resolver';

const routes = [
    {
        path        : 'create',
        component   :  CreateRoleComponent,
    },
    {
        path       : 'manage',
        component  : ManageRoleComponent,
        resolve: { roles: RoleResolver }
    },
    {
      path: 'manage/:id',
      component: CreateRoleComponent,
      resolve: { role: RoleIdResolver }
    }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CreateRoleComponent, ManageRoleComponent],
  providers: [RoleResolver, RoleIdResolver]
})
export class RoleModule { }
