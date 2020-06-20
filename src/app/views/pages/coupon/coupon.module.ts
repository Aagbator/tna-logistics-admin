import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule} from '../../../core/shared.module';
import { ManageCouponComponent } from './manage-coupon/manage-coupon.component';
import { CouponResolver } from './coupon.resolver';

const routes = [
    {
        path       : 'manage',
        component  : ManageCouponComponent,
        resolve: { coupons: CouponResolver }
    }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ManageCouponComponent],
  providers: [CouponResolver]
})
export class CouponModule { }
