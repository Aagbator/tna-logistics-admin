import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, retry} from 'rxjs/operators';
import {PagedDataModel} from '../../models/paged-data.model';
import {Constants} from '../../../config/index';
import {Observable} from 'rxjs';
import {Order} from '../../models/order/order.model';
import {Product} from '../../models/product/product.model';

export interface PagedOrderData extends PagedDataModel {
  data: Array<Order>;
}


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl = Constants.serviceUrl + 'orders';

  constructor(private http: HttpClient) {
  }

  getOrder(page = 1, pageSize = 20, searchQuery = null, transactionStatus = 'ALL', deliveryStatus = 'ALL'): Observable<PagedOrderData> {
    const args = '?page=' + page + '&pageSize=' + pageSize + (searchQuery ? ('&searchQuery=' + searchQuery) : '' )
        + (transactionStatus ? ('&transactionStatus=' + transactionStatus) : '' )
        + (deliveryStatus ? ('&deliveryStatus=' + deliveryStatus) : '' );
    return this.http.get(this.orderUrl + args, Constants.TokenHttpHeaders).pipe(
      retry(1),
      map((res: any) => res.data )
    );
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get(this.orderUrl + '/' + orderId, Constants.TokenHttpHeaders).pipe(
        map( (res: any) => res.data)
    );
  }

  updateOrderStatus(status: string, orderId: number ) {
    return this.http.put(this.orderUrl + '/' + orderId + '?deliveryStatus=' + status, Constants.TokenHttpHeaders).pipe(
        retry(1)
    );
  }


  getEventLogTypes() {
    return this.http.get(this.orderUrl + '/types', Constants.TokenHttpHeaders).pipe(
        retry(1),
        map((res: any) => res.data)
    );
  }

}
