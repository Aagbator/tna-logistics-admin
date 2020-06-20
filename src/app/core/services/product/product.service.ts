import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PagedDataModel} from '../../models/paged-data.model';
import {Constants} from '../../../config/index';
import {catchError, map, retry} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../../models/product/product.model';

export interface PagedProductData extends PagedDataModel {
  data: Array<Product>;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  ProductUrl = Constants.serviceUrl + 'products';

  ProductProfile: BehaviorSubject<Product> = new BehaviorSubject(new Product(''));

  constructor(private http: HttpClient) {
  }


  createProduct(ProductPayload: any) {
    return this.http.post(this.ProductUrl, ProductPayload, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  getProductById(ProductId: number): Observable<Product> {
    return this.http.get(this.ProductUrl + '/' + ProductId, Constants.TokenHttpHeaders).pipe(
      map( (res: any) => res.data)
    );
  }

  getProducts(page = 1, pageSize = 20, categoryId = null, searchQuery = null, productStatus = 'ALL'): Observable<PagedProductData> {
    const args = '?page=' + page + '&pageSize=' + pageSize + (categoryId ? ('&categoryId=' + categoryId) : '' )  + (searchQuery ? ('&searchQuery=' + searchQuery) : '' ) +
      (productStatus ? ('&productStatus=' + productStatus) : '' ) ;
    return this.http.get(this.ProductUrl + args, Constants.TokenHttpHeaders).pipe(
      retry(1),
      map((res: any) => res.data )
    );
  }

  updateProduct(userData: any, ProductId: number ) {
    return this.http.put(this.ProductUrl + '/' + ProductId, userData, Constants.TokenHttpHeaders).pipe(
      retry(3)
    );
  }

  // TODO implement delete product
  deleteProduct(ProductId) {
    return this.http.delete(this.ProductUrl + '/' + ProductId, Constants.TokenHttpHeaders).pipe(
      retry(3)
    );
  }


  // TODO implement activate product
  deactivateProduct(ProductId: number) {
    return this.http.put(this.ProductUrl + '/' + ProductId + '/deactivate-product', {}, Constants.TokenHttpHeaders).pipe(
        retry(3),
        map(data => data)
    );
  }


  // TODO implement deactivate product
  activateProduct(ProductId: number) {
    return this.http.put(this.ProductUrl + '/' + ProductId + '/activate-product', {}, Constants.TokenHttpHeaders).pipe(
        retry(3),
        map(data => data)
    );
  }

  uploadProductProfileImage(fd: FormData, ProductId: number ): any {
    return this.http.put(this.ProductUrl + '/' + ProductId + '/add-image', fd, {
      reportProgress: true, observe: 'events'
    }).pipe(
      retry(2)
    );
  }

  uploadOtherProductImage(fd: FormData, ProductId: number ): any {
    return this.http.post(this.ProductUrl + '/' + ProductId + '/add-other-images', fd, {
      reportProgress: true, observe: 'events'
    }).pipe(
        retry(2)
    );
  }


  // TODO implement add tag
  addTag(tagPayload: any) {
    return this.http.post(this.ProductUrl + '/add-tag', tagPayload, Constants.TokenHttpHeaders).pipe(
        retry(1)
    );
  }

  // TODO implement delete tag
  deleteTag(productId, tagId) {
    return this.http.delete(this.ProductUrl + '/' + productId + '/remove-tag/' + tagId, Constants.TokenHttpHeaders).pipe(
        retry(1)
    );
  }

  // TODO implement add key feature
  addKeyFeature(keyFeaturePayload: any) {
    return this.http.post(this.ProductUrl + '/add-key-features', keyFeaturePayload, Constants.TokenHttpHeaders).pipe(
        retry(1)
    );
  }

  // TODO implement delete key feature
  deleteKeyFeature(productId, keyFeatureId) {
    return this.http.delete(this.ProductUrl + '/delete-key-features/' + keyFeatureId, Constants.TokenHttpHeaders).pipe(
        retry(1)
    );
  }

  // TODO implement update key feature
  updateSpecification(payload: any, specificationId: number ) {
    return this.http.put(this.ProductUrl + '/update-specification/' + specificationId, payload, Constants.TokenHttpHeaders).pipe(
        retry(3)
    );
  }

  // TODO implement add key feature
  addSpecification(keyFeaturePayload: any) {
    return this.http.post(this.ProductUrl + '/add-specification', keyFeaturePayload, Constants.TokenHttpHeaders).pipe(
        retry(1)
    );
  }

  // TODO implement delete key feature
  deleteSpecification(productId, specificationId) {
    return this.http.delete(this.ProductUrl + '/delete-specification/' + specificationId, Constants.TokenHttpHeaders).pipe(
        retry(1)
    );
  }

  // TODO implement delete other images
  deleteOtherImages(otherImageId) {
    return this.http.delete(this.ProductUrl + '/remove-other-images/' + otherImageId, Constants.TokenHttpHeaders).pipe(
        retry(1)
    );
  }

  // TODO implement update key feature
  updateKeyFeature(payload: any, keyFeaturesId: number ) {
    return this.http.put(this.ProductUrl + '/update-key-features/' + keyFeaturesId, payload, Constants.TokenHttpHeaders).pipe(
        retry(3)
    );
  }
}
