import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../../../core/shared.module';
import { QuillModule } from 'ngx-quill';
import {ManagePayoutsComponent } from './manage-payouts/manage-payouts.component';

const routes: any = [
    {
        path       : 'manage',
        component  : ManagePayoutsComponent
    }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    QuillModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ManagePayoutsComponent]
})
export class PayoutModule { }
