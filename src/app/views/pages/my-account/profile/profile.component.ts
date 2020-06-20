import {UtilityService} from '../../../../core/services/utility.service';
import {User} from '../../../../core/models/user/user.model';
import {UserService} from '../../../../core/services/user/user.service';
import {ToastrService} from 'ngx-toastr';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public isEditing: boolean;
  public userProfileForm: FormGroup;
  public updating: boolean;

  public loggedInUser = UtilityService.UserProfile ? new User(UtilityService.UserProfile) : new User('');

  constructor(public fb: FormBuilder, private userService: UserService,  private toaster: ToastrService) {
    this.isEditing = false;
    this.updating = false;
  }

  ngOnInit() {
    this.userProfileForm = this.fb.group({
      'email': [this.loggedInUser.email, [Validators.required, Validators.email]],
      'firstName': [this.loggedInUser.firstName, Validators.required],
      'lastName': [this.loggedInUser.lastName, Validators.required],
      'mobileNo': [this.loggedInUser.mobileNo, Validators.required],
      'roleId':  ['']
    });
  }

  updateProfile() {
    this.updating = true;
    // this.userProfileForm.controls['roleId'].setValue(this.loggedInUser.roleId);
    this.userProfileForm.patchValue({
      roleId: this.loggedInUser.role.id
    });


    this.userService.updateAdmin(this.userProfileForm.value, this.loggedInUser.id).subscribe((res: any) => {
      console.log(res);
      this.loggedInUser = new User(res.data);
      UtilityService.saveUserData(res.data);
      this.updating = false;
      this.isEditing = false;
      this.toaster.success('Update successful', 'Success');
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.updating = false;
    });
  }

  editProfile() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }


}
