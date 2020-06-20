import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {CouponService} from '../../../core/services/coupon/coupon.service';

@Injectable()
export class CouponResolver implements Resolve<any> {
  constructor(private couponService: CouponService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.couponService.getCoupons();
  }
}

