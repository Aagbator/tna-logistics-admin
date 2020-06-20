import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, retry} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PagedDataModel} from '../../models/paged-data.model';
import {Constants} from '../../../config/index';
import {Coupon} from '../../models/coupon/coupon.model';

export interface PagedCouponsData extends PagedDataModel {
  data: Array<Coupon>;
}

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  couponUrl = Constants.serviceUrl + 'coupon';

  constructor(private http: HttpClient) {
  }

  createCoupon(couponPayload: any) {
    return this.http.post(this.couponUrl, couponPayload, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  getCoupons(): Observable<PagedCouponsData> {
    return this.http.get(this.couponUrl, Constants.TokenHttpHeaders).pipe(
      retry(1),
      map((res: any) => res.data)
    );
  }


  // TODO implement de-activate category
  deactivateCoupon(couponId: number) {
    return this.http.put(this.couponUrl + '/' + couponId + '/deactivate-category', {}, Constants.TokenHttpHeaders).pipe(
        retry(1),
        map(data => data)
    );
  }


  // TODO implement activate category
  activateCoupon(couponId: number) {
    return this.http.put(this.couponUrl + '/' + couponId + '/activate-category', {}, Constants.TokenHttpHeaders).pipe(
        retry(3),
        map(data => data)
    );
  }



  // TODO implement delete category
  deleteCoupon(couponId: number) {
    return this.http.delete(this.couponUrl + '/' + couponId, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  updateCoupon(categoryData: any, couponId: number ) {
    return this.http.put(this.couponUrl + '/' + couponId, categoryData, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  uploadCouponImage(fd: FormData, couponId: number ): any {
    return this.http.put(this.couponUrl + '/' + couponId + '/add-image', fd, {
      reportProgress: true, observe: 'events'
    }).pipe(
        retry(2)
    );
  }

  getCouponById(couponId: number): Observable<Coupon> {
    return this.http.get(this.couponUrl + '/' + couponId, Constants.TokenHttpHeaders).pipe(
      retry(1),
      map((res: any) => new Coupon(res.data))
    );
  }
}
