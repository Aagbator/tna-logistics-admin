import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../core/services/user/user.service";
import {ToastrService} from "ngx-toastr";
import {UtilityService} from "../../../../core/services/utility.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  isChangingPassword: boolean;

  constructor(private userService: UserService, private toaster: ToastrService,
              private router: Router, private utilityService: UtilityService) { }

  ngOnInit() {
  }

  onSubmit(formRef) {
    if (formRef.value.newPassword !== formRef.value.confirmPassword) {
      this.toaster.warning('Passwords do not match');
      return false;
    }

    console.log(formRef.value);
    this.isChangingPassword = true;
    this.userService.updatePassword(formRef.value).subscribe((res: any) => {
      console.log(res);
      this.isChangingPassword = false;
      this.toaster.success(res.message + '\n logging out...', 'Success');
      formRef.resetForm({});
      setTimeout(() => {
        this.utilityService.logOutUser();
        this.toaster.info('Kindly login in...');
      }, 2000);
    }, err => {
      this.isChangingPassword = false;
      this.toaster.error(err.message, ' Error');

    });
  }

}
