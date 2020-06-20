import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {RoleService} from '../../../core/services/role/role.service';

@Injectable()
export class RoleIdResolver implements Resolve<any> {
  constructor(private roleService: RoleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id: any = route.params['id'];
    return this.roleService.getRoleById(id);
  }
}

