import { Injectable } from '@angular/core';
import {Constants} from '../../config/index';
import {HttpClient} from '@angular/common/http';
import {retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static saveToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem(Constants.AccessToken, accessToken);
    localStorage.setItem(Constants.RefreshToken, refreshToken);
  }

  static getRefreshToken(): string {
    return localStorage.getItem(Constants.RefreshToken);
  }

  getAccessToken(): string {
    return localStorage.getItem(Constants.AccessToken);
  }

  saveAccessToken(token: string): void {
    console.log('save ', token);
    localStorage.removeItem(Constants.AccessToken);
    localStorage.setItem(Constants.AccessToken, token);
  }


  getNewAccessToken() {
    // Refresh token function here...
    console.log('Get new access , token');
    return this.http.post(Constants.serviceUrl + 'users/refresh-token',
      { 'refreshToken': AuthenticationService.getRefreshToken()},
      Constants.NoTokenHttpHeaders).pipe(
      retry(0));
  }

  constructor(private http: HttpClient) {}

  // getAuthorizationToken() {
  //   console.log('token expired', this.tokenExpired);
  //   if (this.tokenExpired) {
  //     this.getNewAccessToken().subscribe(res => {
  //       console.log('### New Token Refreshed ###');
  //       console.log(res);
  //       const accesstoken: AccessToken = new AccessToken(res.data[0]);
  //       return accesstoken.token;
  //     },
  //     err => console.log(err));
  //     // this.sharedService.logout();
  //   } else {
  //     return localStorage.getItem(Constants.AccessToken);
  //   }
  // }



}
