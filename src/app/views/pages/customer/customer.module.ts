import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../../../core/shared.module';
import {CustomerResolver} from './customer.resolver';
import {ManageCustomerComponent} from './manage-customer/manage-customer.component';
import {ViewEditCustomerComponent} from '../customer/view-edit-customer/view-edit-customer.component';
import {CustomerInformationComponent} from '../customer/view-edit-customer/customer-information/customer-information.component';
import {CustomerIdResolver} from './customerId.resolver';
import {CustomerSponsorshipComponent} from './view-edit-customer/customer-sponsorship/customer-sponsorship.component';
import {CustomerSponsorshipResolver} from './customer-sponsorships.resolver';

const routes = [
    {
        path       : 'manage',
        component  : ManageCustomerComponent,
        resolve: { customers: CustomerResolver }
    },
    {
        path: 'manage/:id',
        component: ViewEditCustomerComponent, //
        resolve: { customer: CustomerIdResolver, subscriptions: CustomerSponsorshipResolver },
        children: [
            // {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {
                path        : '',
                component  : CustomerInformationComponent,
            },
            {
              path        : 'orders',
              component  : CustomerSponsorshipComponent,
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
  declarations: [ManageCustomerComponent, ViewEditCustomerComponent, CustomerSponsorshipComponent, CustomerInformationComponent],
  providers: [CustomerResolver, CustomerIdResolver, CustomerSponsorshipResolver]
})
export class CustomerModule { }
