import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {OrderService} from '../../../core/services/order/order.service';

@Injectable()
export class OrderResolver implements Resolve<any> {
  constructor(private orderService: OrderService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.orderService.getOrder(1, 10, '', '');
  }
}

