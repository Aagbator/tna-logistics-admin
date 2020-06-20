import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router, RouterState, RouterStateSnapshot} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Permission} from '../../../../core/models/permission.model';
import {AuthenticationService} from '../../../../core/services/authentication.service';
import {Admin} from '../../../../core/models/user/admin.model';
import {UtilityService} from '../../../../core/services/utility.service';
import {UserService} from '../../../../core/services/user/user.service';
import {RoleService} from '../../../../core/services/role/role.service';
import {Role} from '../../../../core/models/role/role.model';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html'
})
export class CreateAdminComponent implements OnInit {

  public roles: Role[];
  public isCreatingAdmin: boolean;
  public isLoadingRoles: boolean;

  public isUpdatingAdmin: boolean;
  public adminId;
  public admin: Admin;
  public adminName: string;

  public adminObj = {
    'email': '',
    'firstName': '',
    'lastName': '',
    'mobileNo': '',
    'roleId': null
  };

  constructor(public auth: AuthenticationService,
              private utilService: UtilityService,
              private userService: UserService,
              private toaster: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private roleService: RoleService,
              private activatedRoute: ActivatedRoute
  ) {

    this.isCreatingAdmin = false;
    this.isUpdatingAdmin = false;
    this.adminName = '';

    this.activatedRoute.params.subscribe(params => {
      this.adminId = +params['id'];
    });
  }

  ngOnInit() {
    this.getRoles();
    if (this.adminId) {
      const admin = this.route.snapshot.data['admin'];
      this.adminObj.email = admin.email;
      this.adminObj.firstName = admin.firstName;
      this.adminObj.lastName = admin.lastName;
      this.adminObj.mobileNo = admin.mobileNo;
      this.adminObj.roleId = admin.roleId;
      console.log('admin', admin);
    }
  }


  onSubmit(formValue): void {
    console.log('you submitted value: ', formValue);
    this.createAdmin(formValue);
  }

  createAdmin(userObj: any): void {
    this.isCreatingAdmin = true;
    this.userService.createAdmin(userObj).subscribe((res: any) => {
      this.isCreatingAdmin = false;
      console.log('**** creating user *****');
      console.log(res);
      this.toaster.success(res.message, 'New Admin Created');
      this.isCreatingAdmin = false;
      this.router.navigate(['admin/manage']);
    }, err => {
      console.log(err);
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingAdmin = false;
    });
  }


  updateAdmin(): void {
    this.isUpdatingAdmin = true;
    this.userService.updateAdmin(this.adminObj, this.adminId).subscribe((res: any) => {
      console.log('res', res);
      // this.isEditing = false;
      this.isUpdatingAdmin = false;
      this.toaster.success(res.message, ' Admin Updated');
    }, err => {
      console.log('error', err);
      this.toaster.error(err.message, 'Error');
      this.isUpdatingAdmin = false;
    });
  }

  getRoles(): void {
    console.log('get roles ');
    this.isLoadingRoles = true;
    this.roleService.getRoles(undefined, 0).subscribe((res: any) => {
      console.log('res', res);
      this.isLoadingRoles = false;
      this.roles = res.map(role => new Role(role));
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isLoadingRoles = false;
    });
  }
}
