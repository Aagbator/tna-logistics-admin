import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {OrderResolver} from './order.resolver';
import {ManageOrderComponent} from './manage-order/manage-order.component';
import {SharedModule} from '../../../core/shared.module';
import {ViewOrderComponent} from './view-order/view-order.component';
import {OrderIdResolver} from './orderId.resolver';

const routes: any = [
    {
        path       : '',
        component  : ManageOrderComponent,
        resolve: { orders: OrderResolver }
    },
    {
        path: ':id',
        component: ViewOrderComponent,
        resolve: {order: OrderIdResolver}
        // children: [
        //     {
        //         path: '',
        //         component: ProductInformationComponent,
        //     }
        // ]
    },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ManageOrderComponent, ViewOrderComponent],
  providers: [OrderResolver, OrderIdResolver]
})
export class OrderModule { }
