import {AuthService} from '../../../../core/services/auth/auth.service';
import { Constants } from '../../../../config';
import {UtilityService} from '../../../../core/services/utility.service';
import {AuthenticationService} from '../../../../core/services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-v3',
  templateUrl: './login-v3.component.html',
  styleUrls: ['./login-v3.component.scss']
})
export class LoginV3Component implements OnInit {

  public isLoginMode: boolean;
  public isResetting: boolean;
  errormessage = '';
  loginForm: FormGroup;
  EMAIL_REGEX = '^[a-z0-9!#$%&\'*+\/= ^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9]) (\.[a-z0-9]([a-z0-9-]*[a-z0-9]) )*$';
  public isLoading: boolean;
  public vendor = Constants.VENDOR;
  public year = Constants.YEAR;
  // public loggedInUser = UtilityService.getLoggedInStatus;


  constructor(public fb: FormBuilder,
              private authService: AuthService,
              private utilityService: UtilityService,
              private toaster: ToastrService,
              private router: Router ) {
    this.isLoading = false;
    this.isResetting = false;

  }

  ngOnInit() {
    this.isLoginMode = true;
  }

  onSubmit(loginForm: any): void {
    this.isLoading = true;

    this.authService.signInUser(loginForm.value).subscribe((res: any) => {
      this.router.navigate(['/dashboard']);
      UtilityService.saveUserData(res.data);
      const accessToken = res.data.accessTokenDetails.accessToken;
      const refreshToken = res.data.refreshTokenDetails.refreshToken;
      AuthenticationService.saveToken(accessToken, refreshToken);
      // UtilityService.setLoggedInStatus(true);
      this.isLoading = false;
    }, err => {
      this.toaster.error(err.error.message , 'Error');
      // console.log(err.error.message);
      this.isLoading = false;
    });
  }


  onReset(resetForm: any): void {
    this.isResetting = true;
    console.log(resetForm.value);

    this.authService.resetPassword(resetForm.value.email).subscribe((res: any) => {
        this.toaster.success('Password reset successfully, Check your mail for Instructions', 'Reset Success');
        this.isResetting = false;
        this.utilityService.logOutUser();
      },
      err => {
        this.isResetting = false;
        this.toaster.error(err.error.message, 'Error');
      });
  }

  toggleForm() {
    this.isLoginMode = !this.isLoginMode;
  }
}
