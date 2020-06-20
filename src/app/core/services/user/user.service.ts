import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../../models/user/customer.model';
import {PagedDataModel} from '../../models/paged-data.model';
import {Constants} from '../../../config/index';
import {Admin} from '../../models/user/admin.model';
import {catchError, map, retry} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface PagedAdminData extends PagedDataModel {
  data: Array<Admin>;
}

export interface PagedCustomerData extends PagedDataModel {
  data: Array<Customer>;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = Constants.serviceUrl + 'users';
  adminUrl = Constants.serviceUrl + 'admins';
  customerUrl = Constants.serviceUrl + 'customers';

  constructor(private http: HttpClient) {
  }

  createAdmin(adminPayload: any) {
    // console.log('****', loginData);
    return this.http.post(this.adminUrl, adminPayload, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  getAdminById(userId: number): Observable<Admin> {
    return this.http.get(this.userUrl + '/' + userId, Constants.TokenHttpHeaders).pipe(
      retry(3),
      map((res: any) => new Admin(res.data))
    );
  }

  getAdmins(page = 1, pageSize = 20, searchQuery = '', status = 2): Observable<PagedAdminData> {
    const args = '?page=' + page + '&pageSize=' + pageSize + '&searchQuery=' + searchQuery + '&status=' + status;
    return this.http.get(this.adminUrl + args, Constants.TokenHttpHeaders).pipe(
      retry(3),
      map((res: any) => res.data )
    );
  }

  getCustomerById(userId: number): Observable<Customer> {
    return this.http.get(this.customerUrl + '/' + userId, Constants.TokenHttpHeaders).pipe(
        retry(3),
        map((res: any) => new Customer(res.data))
    );
  }

  getCustomers(page = 1, pageSize = 20, searchQuery = '', status = 2): Observable<PagedCustomerData> {
    const args = '?page=' + page + '&pageSize=' + pageSize + '&searchQuery=' + searchQuery + '&status=' + status;
    return this.http.get(this.customerUrl + args, Constants.TokenHttpHeaders).pipe(
        retry(3),
        map((res: any) => res.data )
    );
  }

  updateAdmin(userData: any, userId: number ) {
    return this.http.put(this.adminUrl + '/' + userId, userData, Constants.TokenHttpHeaders).pipe(
      retry(3)
    );
  }

  // TODO implement delete user
  deleteUser(userId) {
    return this.http.delete(this.userUrl + '/' + userId, Constants.TokenHttpHeaders).pipe(
      retry(3)
    );
  }

  // updateProfile(userData: User, userId: number ): Observable<User> {
  //   return this.http.put(this.adminUrl + '/' + userId, userData, Constants.TokenHttpHeaders).pipe(
  //     retry(3),
  //     map((data: any) => {
  //       localStorage.setItem(Constants.userProfileStore, JSON.stringify(data.data));
  //       return new User(data.data);
  //     })
  //     // catchError(this.handleError<Admin>('updateAdmin', null))
  //   );
  // }


  // // TODO implement password reset
  // resetPassword(email: string) {
  //   return this.http.get(this.userUrl + 'reset-password?email=' + email, Constants.NoTokenHttpHeaders).pipe(
  //     retry(1)
  //   );
  // }
  //
  //
  //
  //
  // // TODO implement get user my-account
  // getProfile() {
  //   return this.http.get(this.userUrl + 'profile', Constants.NoTokenHttpHeaders).pipe(
  //     retry(3),
  //     map(data => data),
  //     catchError(this.handleError<User>('getProfile', null))
  //   );
  // }
  //
  updatePassword(formData) {
    return this.http.post(this.userUrl + '/password-change', formData, Constants.TokenHttpHeaders).pipe(
      retry(3),
      map(data => data),
      // catchError(this.handleError<Admin>('createPassword', null))
    );
  }

// TODO implement block user
  getUserById(userId: number) {
    return this.http.get(this.userUrl + '/' + userId, Constants.TokenHttpHeaders).pipe(
        retry(3),
        map(data => data)
        // catchError(this.handleError<Admin>('blockUser'))
    );
  }


  // TODO implement block user
  blockUser(userId: number) {
    return this.http.put(this.userUrl + '/block/' + userId, {}, Constants.TokenHttpHeaders).pipe(
      retry(3),
      map(data => data)
      // catchError(this.handleError<Admin>('blockUser'))
    );
  }


  // TODO implement unblock user
  unBlockUser(userId: number) {
    return this.http.put(this.userUrl + '/unblock/' + userId, {}, Constants.TokenHttpHeaders).pipe(
      retry(3),
      map(data => data),
      // catchError(this.handleError<Admin>('unBlockUser', null))
    );
  }




  // getCustomers(page = 1, pageSize = 20, query = '', status = 2): Observable<PagedCustomerData> {
  //   const args = '?page=' + page + '&pageSize=' + pageSize + '&query=' + query + '&status=' + status;
  //   return this.http.get(this.customerUrl + args, Constants.TokenHttpHeaders).pipe(
  //     retry(3),
  //     map((res: any) => res.data )
  //   );
  // }

}
