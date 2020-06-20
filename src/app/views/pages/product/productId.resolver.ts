import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {ProductService} from '../../../core/services/product/product.service';
import {Product} from '../../../core/models/product/product.model';

@Injectable()
export class ProductIdResolver implements Resolve<Product> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id: any = route.params['id'];
    return this.productService.getProductById(id);
  }
}

