import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {BankTransferSubscriptionService} from '../../../core/services/sponsorship/bank-transfer-subscription.service';

@Injectable()
export class BankPaymentsResolver implements Resolve<any> {
  constructor(private bankTransferSubscriptionService: BankTransferSubscriptionService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.bankTransferSubscriptionService.getBankTransferSubscriptions(1, 10);
  }
}

