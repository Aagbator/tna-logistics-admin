import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../../../core/shared.module';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import {CategoryResolver} from './category.resolver';

const routes = [
    {
        path       : 'manage',
        component  : ManageCategoryComponent,
        resolve: { categories: CategoryResolver }
    }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ManageCategoryComponent],
  providers: [CategoryResolver]
})
export class CategoryModule { }
