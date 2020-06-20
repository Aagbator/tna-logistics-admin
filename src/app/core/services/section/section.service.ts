import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, retry} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PagedDataModel} from '../../models/paged-data.model';
import {Constants} from '../../../config/index';
import {Section} from '../../models/section/section.model';

export interface PagedSectionsData extends PagedDataModel {
  data: Array<Section>;
}

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  sectionUrl = Constants.serviceUrl + 'sections';

  constructor(private http: HttpClient) {
  }

  createSection(sectionPayload: any) {
    return this.http.post(this.sectionUrl, sectionPayload, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  getSections(): Observable<PagedSectionsData> {
    return this.http.get(this.sectionUrl, Constants.TokenHttpHeaders).pipe(
      retry(1),
      map((res: any) => res.data)
    );
  }

  // TODO implement delete category
  deleteSection(sectionId: number) {
    return this.http.delete(this.sectionUrl + '/' + sectionId, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  updateSection(categoryData: any, sectionId: number ) {
    return this.http.put(this.sectionUrl + '/' + sectionId, categoryData, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  addProductToSection(payloadData: any, sectionId: number ) {
    return this.http.put(this.sectionUrl + '/' + sectionId + '/add-product', payloadData, Constants.TokenHttpHeaders).pipe(
        retry(1)
    );
  }

  removeProductFromSection(payloadData: any, sectionId: number ) {
    return this.http.put(this.sectionUrl + '/' + sectionId + '/remove-product', payloadData, Constants.TokenHttpHeaders).pipe(
        retry(1)
    );
  }


  getSectionById(sectionId: number): Observable<Section> {
    return this.http.get(this.sectionUrl + '/' + sectionId, Constants.TokenHttpHeaders).pipe(
      retry(1),
      map((res: any) => new Section(res.data))
    );
  }
}
