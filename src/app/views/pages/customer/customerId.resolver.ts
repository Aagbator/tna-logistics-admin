import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {UserService} from '../../../core/services/user/user.service';

@Injectable()
export class CustomerIdResolver implements Resolve<any> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id: any = route.params['id'];
    return this.userService.getUserById(id);
  }
}

