import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {RoleService} from '../../../core/services/role/role.service';

@Injectable()
export class RoleResolver implements Resolve<any> {
  constructor(private roleService: RoleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.roleService.getRoles(1, 10);
  }
}

