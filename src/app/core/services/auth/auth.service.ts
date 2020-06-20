import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user/user.model';
import {catchError, map, retry} from 'rxjs/operators';
import {UtilityService} from '../utility.service';
import {Constants} from '../../../config/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userUrl = Constants.serviceUrl + 'users/';


  constructor(private http: HttpClient) {
  }

  signInUser(authPayload: any) {
    // console.log('****', loginData);
    return this.http.post(this.userUrl + 'login' , authPayload, Constants.NoTokenHttpHeaders).pipe(
      retry(1)
    );
  }

  // TODO implement password reset
  resetPassword(email: string) {
    return this.http.get(this.userUrl + 'reset-password?email=' + email, Constants.NoTokenHttpHeaders).pipe(
      retry(1)
    );
  }

  createUser(userData: User) {
    return this.http.post(this.userUrl + 'create-roomie', userData, Constants.NoTokenHttpHeaders).pipe(
      retry(3),
      map(data => data)
    );
  }

  // TODO implement delete user
  deleteUser(userId) {
    return this.http.post(this.userUrl + userId + 'delete', userId, Constants.NoTokenHttpHeaders).pipe(
      retry(3),
      map(data => data)
    );
  }

  updateUser(userData: User, userId: number ) {
    return this.http.put(this.userUrl + 'update-roomie/' + userId, userData, Constants.TokenHttpHeaders).pipe(
      retry(3),
      map(data => data)
    );
  }

  // TODO implement get user by id
  getUser(userId: number) {
    return this.http.get<User>(this.userUrl + userId, Constants.NoTokenHttpHeaders).pipe(
      map((res: any) => new User(res.data)),
      retry(3),
      map(data => data)
    );
  }

  // TODO implement get user my-account
  getProfile() {
    return this.http.get(this.userUrl + 'profile', Constants.NoTokenHttpHeaders).pipe(
      retry(3),
      map(data => data)
    );
  }

  // TODO implement create password
  createPassword() {
    return this.http.get(this.userUrl + 'password/create', Constants.TokenHttpHeaders).pipe(
      retry(3),
      map(data => data)
    );
  }

  // TODO implement update password
  updatePassword() {
    return this.http.get(this.userUrl + 'password/change', Constants.TokenHttpHeaders).pipe(
      retry(3),
      map(data => data)
    );
  }

  // TODO implement search user
  searchUser(searchParams: string) {
    return this.http.put(this.userUrl + 'search', searchParams, Constants.NoTokenHttpHeaders).pipe(
      retry(3),
      map(data => data)
    );
  }


  // TODO implement block user
  blockUser(userId: number) {
    return this.http.put(this.userUrl + userId + 'block', Constants.TokenHttpHeaders).pipe(
      retry(3),
      map(data => data)
    );
  }

  // TODO implement unblock user
  unBlockUser(userId: number) {
    return this.http.put(this.userUrl + userId + 'unblock', Constants.TokenHttpHeaders).pipe(
      retry(3),
      map(data => data)
    );
  }

  // TODO implement upload image
  uploadImage(image) {
    return this.http.post(this.userUrl + 'upload/my-account-image',  image, Constants.TokenHttpHeaders).pipe(
      retry(3),
      map(data => data)
    );
  }

// logout service
//   logout() {
//     localStorage.clear();
//     this.router.navigate([Constants.SIGNIN_URL]);
//   }
}
