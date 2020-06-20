import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dashboard} from '../../models/dashboard/dashboard.model';
import {Constants} from '../../../config/index';
import {catchError, map, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  reportUrl = Constants.serviceUrl + 'report';

  constructor(private http: HttpClient) {
  }

  getDashboardStatistics() {
    return this.http.get(this.reportUrl + '/dashboard', Constants.TokenHttpHeaders).pipe(
        retry(0),
        map((res: any) => res.data)
    );
  }

}



