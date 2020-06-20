import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {SubscriptionService} from '../../../core/services/sponsorship/subscription.service';

@Injectable()
export class CustomerSponsorshipResolver implements Resolve<any> {
  constructor(private customerSubscription: SubscriptionService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id: any = route.params['id'];
    return [this.customerSubscription.getProductSubscriptions(1, 10, null, id), id];
  }
}

