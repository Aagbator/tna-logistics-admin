import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PagedDataModel} from '../../models/paged-data.model';
import {Constants} from '../../../config/index';
import {catchError, map, retry} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../../models/product/product.model';
import {PagedCustomerData} from '../user/user.service';
import {Subscription} from '../../models/subscription/subscription.model';

export interface PagedSubscriptionData extends PagedDataModel {
  data: Array<Subscription>;
}


@Injectable({
  providedIn: 'root'
})
export class BankTransferSubscriptionService {

  BankTransferSubscriptionUrl = Constants.serviceUrl + 'product-subscription-reservation';

  constructor(private http: HttpClient) {
  }

  getBankTransferSubscriptions(page = 1, pageSize = 20, query = '', productId = null): Observable<PagedSubscriptionData> {
    const args = '?page=' + page + '&pageSize=' + pageSize + (query ? ('&query=' + query) : '' )  + (productId ? ('&productId=' + productId) : '' );
    return this.http.get(this.BankTransferSubscriptionUrl + args, Constants.TokenHttpHeaders).pipe(
        retry(1),
        map((res: any) => res.data )
    );
  }

  deleteBankTransferSubscription(subscriptionId) {
    return this.http.delete(this.BankTransferSubscriptionUrl + '/' + subscriptionId, Constants.TokenHttpHeaders).pipe(
        retry(1)
    );
  }

  approveBankTransferSubscription(subscriptionId) {
    return this.http.put(this.BankTransferSubscriptionUrl + '/' + subscriptionId , {}, Constants.TokenHttpHeaders).pipe(
        retry(1)
    );
  }

}
