import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PagedDataModel} from '../../models/paged-data.model';
import {Constants} from '../../../config/index';
import {catchError, map, retry} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../../models/product/product.model';

export interface PagedProductData extends PagedDataModel {
  data: Array<Product>;
}


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  ProductSubscriptionUrl = Constants.serviceUrl + 'production-subscription';

 //  http://51.91.157.86/farm/api/production-subscription?page=1&pageSize=20&productId=4&userId=6

  constructor(private http: HttpClient) {
  }


  createProduct(ProductPayload: any) {
    return this.http.post(this.ProductSubscriptionUrl, ProductPayload, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  subscribeCustomer(SubscribePayload: any) {
    return this.http.post(this.ProductSubscriptionUrl + '/subscribe-customer', SubscribePayload, Constants.TokenHttpHeaders).pipe(
        retry(1)
    );
  }


  getProductById(ProductId: number): Observable<Product> {
    return this.http.get(this.ProductSubscriptionUrl + '/' + ProductId, Constants.TokenHttpHeaders).pipe(
      map( (res: any) => res.data)
    );
  }

  getProductSubscriptions(page = 1, pageSize = 20, productId = null, userId = null): Observable<PagedProductData> {
    const args = '?page=' + page + '&pageSize=' + pageSize + (productId ? ('&productId=' + productId) : '' )  + (userId ? ('&userId=' + userId) : '' );
    return this.http.get(this.ProductSubscriptionUrl + args, Constants.TokenHttpHeaders).pipe(
      retry(1),
      map((res: any) => res.data )
    );
  }

  getMaturedInvestments(page = 1, pageSize = 20, productId = null): Observable<PagedProductData> {
    const args = '?page=' + page + '&pageSize=' + pageSize + (productId ? ('&productId=' + productId) : '' );
    return this.http.get(this.ProductSubscriptionUrl + '/matured-investment' + args, Constants.TokenHttpHeaders).pipe(
        retry(1),
        map((res: any) => res.data )
    );
  }

  markSubscriptionAsPaid(subscriptionId) {
    return this.http.put(this.ProductSubscriptionUrl + '/' + subscriptionId, {}, Constants.TokenHttpHeaders).pipe(
        retry(3)
    );
  }

  requerySubscription(subscriptionId) {
    return this.http.put(this.ProductSubscriptionUrl + '/' + subscriptionId + '/requery-subscription', {}, Constants.TokenHttpHeaders).pipe(
        retry(3)
    );
  }

  updateProduct(userData: any, ProductId: number ) {
    return this.http.put(this.ProductSubscriptionUrl + '/' + ProductId, userData, Constants.TokenHttpHeaders).pipe(
      retry(3)
    );
  }


  // TODO implement delete product
  deleteSubscription(subscriptionId) {
    return this.http.delete(this.ProductSubscriptionUrl + '/' + subscriptionId, Constants.TokenHttpHeaders).pipe(
      retry(3)
    );
  }


  // TODO implement activate product
  deactivateProduct(ProductId: number) {
    return this.http.put(this.ProductSubscriptionUrl + '/' + ProductId + '/deactivate-product', {}, Constants.TokenHttpHeaders).pipe(
        retry(3),
        map(data => data)
    );
  }


  // TODO implement deactivate product
  activateProduct(ProductId: number) {
    return this.http.put(this.ProductSubscriptionUrl + '/' + ProductId + '/activate-product', {}, Constants.TokenHttpHeaders).pipe(
        retry(3),
        map(data => data)
    );
  }

}
