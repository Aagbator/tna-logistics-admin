import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {OrderService} from '../../../core/services/order/order.service';

@Injectable()
export class OrderIdResolver implements Resolve<any> {
  constructor(private orderService: OrderService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id: any = route.params['id'];
    return this.orderService.getOrderById(id);
  }
}

