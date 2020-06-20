import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {ProductService} from '../../../core/services/product/product.service';

@Injectable()
export class ProductResolver implements Resolve<any> {
  constructor(private productService: ProductService) {
    // setproductProfile
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.productService.getProducts(1, 10);
  }
}

