import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../../config/index';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  deliveryCostUrl = Constants.serviceUrl + 'delivery-cost';

  constructor(private http: HttpClient) {
  }

  updateDeliveryCost(lgaId: number, amount: number ) {
    return this.http.put(this.deliveryCostUrl + '/' + lgaId + '?amount=' + amount, Constants.TokenHttpHeaders);
  }
}
