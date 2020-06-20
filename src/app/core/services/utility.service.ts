import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, retry, map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs/index';
import {User} from '../models/user/user.model';

import {PagedDataModel} from '../models/paged-data.model';
import {Constants} from '../../config/index';
import {Router} from "@angular/router";

// export interface PagedTransactionData extends PagedDataModel {
//   data: Array<Transaction>;
// }

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  public static isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public static userData: BehaviorSubject<User> = new BehaviorSubject(new User(''));
  private serviceUrl = Constants.serviceUrl;

  public static get UserProfile() {
    if (localStorage.getItem(Constants.userProfileStore) !== null) {
      return new User(JSON.parse(localStorage.getItem(Constants.userProfileStore)));
    }
    return new User('');
  }

  public static checkIfLoggedIn() {
    if (localStorage.getItem(Constants.AccessToken) !== '' && localStorage.getItem(Constants.AccessToken) &&
      localStorage.getItem(Constants.AccessToken) !==  undefined ) {
      return this.isLoggedIn.next(true);
    } else {
      return this.isLoggedIn.next(false);
    }
  }

  public static getUserData() {
    if (localStorage.getItem(Constants.userProfileStore) !== '' && localStorage.getItem(Constants.userProfileStore) &&
      Constants.userProfileStore !== undefined) {
      return this.userData.next(new User(JSON.parse(localStorage.getItem(Constants.userProfileStore))));
    } else {
      return new User('');
    }
  }

  public static getLoggedInStatus() {
    return localStorage.getItem(Constants.userProfileStore) != null;
  }

  public static saveUserData(user: User) {
    localStorage.setItem(Constants.userProfileStore, JSON.stringify(user));
    UtilityService.getUserData();
  }

  public static setLoggedInStatus(value: boolean) {
    UtilityService.isLoggedIn.next(value);
    UtilityService.getUserData();
  }
  constructor(private http: HttpClient, private router: Router) {}

  getTransactionCount() {
    return this.http.get(this.serviceUrl + 'report/transaction-count', Constants.TokenHttpHeaders).pipe(
      retry(0),
      map((res: any) => res.data)
    );
  }

   logOutUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getPermissions() {
    return this.http.get(this.serviceUrl + 'role/permissions', Constants.NoTokenHttpHeaders).pipe(
      retry(0)
    );
  }

  getPaymentTypes() {
    return this.http.get(this.serviceUrl + 'utilities/payment-types', Constants.TokenHttpHeaders).pipe(
        retry(0)
    );
  }

  getLGA() {
    return this.http.get(this.serviceUrl + 'utilities/lga', Constants.TokenHttpHeaders).pipe(
      retry(0)
    );
  }

  uploadImageFile(imageFile: FormData): any {
    return this.http.post(this.serviceUrl + 'utility/upload', imageFile, {
      reportProgress: true, observe: 'events'
    }).pipe(
      retry(2)
    );
  }
}
