import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../../../core/shared.module';
import {BankPaymentsResolver} from './bank-payments.resolver';
import {ManageBankPaymentsComponent} from './manage-bank-payments/manage-bank-payments.component';

const routes = [
    {
        path       : 'manage',
        component  : ManageBankPaymentsComponent,
        resolve: { customers: BankPaymentsResolver }
    },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ManageBankPaymentsComponent],
  providers: [BankPaymentsResolver]
})
export class BankPaymentsModule { }
