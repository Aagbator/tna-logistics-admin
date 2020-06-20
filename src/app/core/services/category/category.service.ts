import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, retry} from 'rxjs/operators';
import {UtilityService} from '../../services/utility.service';
import {Observable} from 'rxjs';
import {PagedDataModel} from '../../models/paged-data.model';
import {Constants} from '../../../config/index';
import {Category} from '../../models/category/category.model';

export interface PagedCategoriesData extends PagedDataModel {
  data: Array<Category>;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoriesUrl = Constants.serviceUrl + 'categories';

  constructor(private http: HttpClient) {
  }

  createCategory(categoryPayload: any) {
     console.log('****', categoryPayload);
    return this.http.post(this.categoriesUrl, categoryPayload, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  getCategories(): Observable<PagedCategoriesData> {
    return this.http.get(this.categoriesUrl, Constants.TokenHttpHeaders).pipe(
      retry(3),
      map((res: any) => res.data)
    );
  }


  // TODO implement de-activate category
  deactivateCategory(categoryId: number) {
    return this.http.put(this.categoriesUrl + '/' + categoryId + '/deactivate-category', {}, Constants.TokenHttpHeaders).pipe(
        retry(3),
        map(data => data)
    );
  }


  // TODO implement activate category
  activateCategory(categoryId: number) {
    return this.http.put(this.categoriesUrl + '/' + categoryId + '/activate-category', {}, Constants.TokenHttpHeaders).pipe(
        retry(3),
        map(data => data)
    );
  }



  // TODO implement delete category
  deleteCategory(categoryId: number) {
    return this.http.delete(this.categoriesUrl + '/' + categoryId, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  updateCategory(categoryData: any, categoryId: number ) {
    return this.http.put(this.categoriesUrl + '/' + categoryId, categoryData, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  uploadCategoryImage(fd: FormData, categoryId: number ): any {
    return this.http.put(this.categoriesUrl + '/' + categoryId + '/add-image', fd, {
      reportProgress: true, observe: 'events'
    }).pipe(
        retry(2)
    );
  }

  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get(this.categoriesUrl + '/' + categoryId, Constants.TokenHttpHeaders).pipe(
      retry(1),
      map((res: any) => new Category(res.data))
    );
  }
}
