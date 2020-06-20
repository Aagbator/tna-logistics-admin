import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {BannerService} from '../../../core/services/banner/banner.service';

@Injectable()
export class BannerResolver implements Resolve<any> {
  constructor(private bannerService: BannerService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.bannerService.getBanners();
  }
}

