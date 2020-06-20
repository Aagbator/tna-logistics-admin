import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, retry} from 'rxjs/operators';
import {UtilityService} from '../../services/utility.service';
import {Observable} from 'rxjs';
import {PagedDataModel} from '../../models/paged-data.model';
import {Constants} from '../../../config/index';
import {Banner} from '../../models/banner/banner.model';

export interface PagedBannersData extends PagedDataModel {
  data: Array<Banner>;
}

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  bannerUrl = Constants.serviceUrl + 'banner';

  constructor(private http: HttpClient) {
  }

  createBanner(bannerPayload: any) {
     console.log('****', bannerPayload);
    return this.http.post(this.bannerUrl, bannerPayload, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  getBanners(bannerStatus = 'ALL'): Observable<PagedBannersData> {
    return this.http.get(this.bannerUrl + '?bannerStatus=' + bannerStatus, Constants.TokenHttpHeaders).pipe(
      retry(3),
      map((res: any) => res.data)
    );
  }

  // TODO implement de-activate banner
  deactivateBanner(bannerId: number) {
    return this.http.put(this.bannerUrl + '/' + bannerId + '/deactivate', {}, Constants.TokenHttpHeaders).pipe(
        retry(3),
        map(data => data)
    );
  }


  // TODO implement activate banner
  activateBanner(bannerId: number) {
    return this.http.put(this.bannerUrl + '/' + bannerId + '/activate', {}, Constants.TokenHttpHeaders).pipe(
        retry(3),
        map(data => data)
    );
  }



  // TODO implement delete banner
  deleteBanner(bannerId: number) {
    return this.http.delete(this.bannerUrl + '/' + bannerId, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  updateBanner(bannerData: any, bannerId: number ) {
    return this.http.put(this.bannerUrl + '/' + bannerId, bannerData, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  uploadBannerImage(fd: FormData, bannerId: number ): any {
    return this.http.put(this.bannerUrl + '/' + bannerId + '/add-image', fd, {
      reportProgress: true, observe: 'events'
    }).pipe(
        retry(2)
    );
  }

  getBannerById(bannerId: number): Observable<Banner> {
    return this.http.get(this.bannerUrl + '/' + bannerId, Constants.TokenHttpHeaders).pipe(
      retry(1),
      map((res: any) => new Banner(res.data))
    );
  }
}
