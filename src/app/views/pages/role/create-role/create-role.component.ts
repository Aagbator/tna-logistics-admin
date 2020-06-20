import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router, RouterState, RouterStateSnapshot} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Permission} from '../../../../core/models/permission.model';
import {AuthenticationService} from '../../../../core/services/authentication.service';
import {Role} from '../../../../core/models/role/role.model';
import {UtilityService} from '../../../../core/services/utility.service';
import {RoleService} from '../../../../core/services/role/role.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html'
})
export class CreateRoleComponent implements OnInit {
  errormessage = '';
  permissionsList: Permission [] = [];
  activePermissions: Permission[] = [];

  public isLoadingPermissions: boolean;
  public isCreatingRole: boolean;
  public isUpdatingRole: boolean;
  public roleId;
  public role: Role;
  public roleName: string;
  public rolePermissions: Permission[] = [];

  constructor(public auth: AuthenticationService,
              private utilService: UtilityService,
              private roleService: RoleService,
              private toaster: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private activatedRoute: ActivatedRoute
  ) {
    this.isLoadingPermissions = false;
    this.isCreatingRole = false;
    this.isUpdatingRole = false;
    this.roleName = '';
    this.permissionsList = [];
    this.activePermissions = [];

    this.activatedRoute.params.subscribe(params => {
      this.roleId = +params['id'];
    });
  }

  ngOnInit() {
    if (this.roleId) {
      console.log('get all permissions ');
      this.isLoadingPermissions = true;

      this.utilService.getPermissions().subscribe((res: any) => {
        const copyPermList: Permission[] = res.data.map((perm) => new Permission(perm));
        this.isLoadingPermissions = false;

        const role = this.route.snapshot.data['role'];
        console.log('role', role);
        this.roleName = role.name;
        this.rolePermissions = role.permissions.map(perm => new Permission(perm));
        this.getRolePermissions(this.rolePermissions, copyPermList);

        // this.roleService.getRoleById(this.roleId).subscribe( (response: any ) => {
        //   this.role = response;
        //   this.roleName = thisrole.name;
        //   this.rolePermissions = this.role.permissions.map(perm => new Permission(perm));
        //   this.getRolePermissions(this.rolePermissions, copyPermList);
        //   this.isLoadingPermissions = false;
        // });
      }, err => {
        this.toaster.error(err.error.error, 'Error');
        this.isLoadingPermissions = false;
      });
    } else {
      this.getAllPermissions();
    }


  }


  getAllPermissions(): void {
    console.log('get all permissions ');
    this.isLoadingPermissions = true;

    this.utilService.getPermissions().subscribe((res: any) => {
      this.permissionsList = res.data.map((perm) => new Permission(perm));
      this.isLoadingPermissions = false;
    }, err => {
      this.toaster.error(err.error.error, 'Error');
      this.isLoadingPermissions = false;
    });
  }

  getRolePermissions(rolePerm: Permission[], permList: Permission[]): void {
    const newPermList = [...permList];
    rolePerm.forEach(perm => {
      newPermList.forEach(ele => {
        if (perm.code == ele.code) {
          newPermList.splice(newPermList.indexOf(ele), 1);
        }
      });
    });
    this.permissionsList = newPermList;
    this.activePermissions = rolePerm;
  }

  addToActivePermissions = (permission: Permission) => {
    this.permissionsList.splice( this.permissionsList.indexOf(permission), 1 );

    this.activePermissions.push(permission);
    this.activePermissions.sort((a, b) => b.id - a.id);
  }

  removeFromActivePermissions = (permission: Permission) => {
    this.activePermissions.splice( this.activePermissions.indexOf(permission), 1 );

    this.permissionsList.push(permission);
    this.permissionsList.sort((a, b) => a.id - b.id);
  }

  onSubmit(formValue): void {
    if(this.activePermissions.length == 0) {
      this.toaster.error('You must select at least one permission');
      return null;
    }
    const permissionIds = this.activePermissions.map(perm => perm.id);
    const roleObj = {'name': formValue.roleName, 'permissions': permissionIds };

    this.isCreatingRole = true;

    this.roleService.createRole(roleObj).subscribe((res: any) => {
      this.toaster.success(formValue.roleName + ' was created successfully!', 'Role created');
      this.router.navigate(['/role/manage']);
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingRole = false;
    });
  }

  updateRole(): void {
    const permissionIds = this.activePermissions.map(perm => perm.id);

    const roleObj = {
      'name': this.roleName,
      'permissions': permissionIds
    };

    this.isUpdatingRole = true;

    this.roleService.updateRole(roleObj, +this.roleId).subscribe((res: any) => {
      console.log(res);
      this.toaster.success(roleObj.name + ' was updated successfully!', 'Role Updated');
      this.router.navigate(['/role/manage']);
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isUpdatingRole = false;
    });
  }
}
