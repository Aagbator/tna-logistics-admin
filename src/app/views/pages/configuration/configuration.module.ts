 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule} from '../../../core/shared.module';
import { DeliveryCostComponent } from './delivery-cost/delivery-cost.component';
import { DeliveryCostResolver } from './delivery-cost.resolver';
 import {CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule} from 'ng2-currency-mask';

const routes = [
    {
        path       : 'delivery-cost',
        component  : DeliveryCostComponent,
        resolve: { lgas: DeliveryCostResolver }
    }
];

 export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
     align: 'left',
     allowNegative: false,
     decimal: '.',
     precision: 2,
     prefix: '₦ ',
     suffix: '',
     thousands: ','
 };

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CurrencyMaskModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DeliveryCostComponent],
  providers: [DeliveryCostResolver, { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }]
})
export class ConfigurationModule { }
