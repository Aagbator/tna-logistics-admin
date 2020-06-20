import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {AuthenticationService} from '../services/authentication.service';
import {AccessToken} from '../models/accessToken.model';
import {UtilityService} from '../services/utility.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authToken: string;
  constructor(private auth: AuthenticationService, private utilityService: UtilityService, private router: Router, private toaster: ToastrService) {}
// Request needs authentication
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get('No-auth') === 'True' ) {
      return next.handle(req.clone());
    }

    // Get the auth token from the service.
    this.authToken = this.auth.getAccessToken();

    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.authToken)
    });

    return next.handle(authReq).pipe(
      tap(
        event => {
        if (event instanceof HttpResponse) {
          return event;
        }
      },
       error => {
        console.log('Caught error', error);
        if (error instanceof HttpErrorResponse) {
            if (error.status === 0) {
                alert('Connection Lost. Kindly check your network');
            }

          if (error.status === 401) {
                if(error.error.responseCode == 'E4001'){
                    console.log('token is expired');
                    console.log(error);

                    this.auth.getNewAccessToken().subscribe((res: any) => {
                            const accessToken = res.data.accessTokenDetails.accessToken;
                            console.log(res);
                            console.log(accessToken);
                            this.auth.saveAccessToken(accessToken);
                            const expiredAuthReq = req.clone({
                                headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
                            });
                            return next.handle(expiredAuthReq);
                        },
                        err => {
                            this.utilityService.logOutUser();
                        });
                }


          } else if (error.status === 403) { // log back in!!

            this.router.navigate(['/login']);

          } else if (error.status === 0) { // log back in!!

            this.toaster.show('Please Check your Internet Connection', 'No Network');

            console.log('No Network, Please Check your Internet Connection');

          }

        } else {

          return throwError(error);

        }
        return throwError(error);
      })
  );
  }
}
