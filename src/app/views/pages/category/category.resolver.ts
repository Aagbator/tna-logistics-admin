import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {CategoryService} from '../../../core/services/category/category.service';

@Injectable()
export class CategoryResolver implements Resolve<any> {
  constructor(private categoryService: CategoryService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.categoryService.getCategories();
  }
}

