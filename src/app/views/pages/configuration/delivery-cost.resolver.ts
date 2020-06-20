import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {UtilityService} from '../../../core/services/utility.service';

@Injectable()
export class DeliveryCostResolver implements Resolve<any> {
  constructor(private utilService: UtilityService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.utilService.getLGA();
  }
}

