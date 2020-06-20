import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, retry} from 'rxjs/operators';
import {UtilityService} from '../../services/utility.service';
import {Observable} from 'rxjs';
import {PagedDataModel} from '../../models/paged-data.model';
import {Role} from '../../models/role/role.model';
import {Constants} from '../../../config/index';

export interface PagedRoleData extends PagedDataModel {
  data: Array<Role>;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roleUrl = Constants.serviceUrl + 'role';

  constructor(private http: HttpClient) {
  }

  createRole(rolePayload: any) {
     console.log('****', rolePayload);
    return this.http.post(this.roleUrl, rolePayload, Constants.TokenHttpHeaders).pipe(
      retry(1)
    );
  }

  getRoles(page = 1, pageSize = 20): Observable<PagedRoleData> {
    const args = '?page=' + page + '&pageSize=' + pageSize;
    return this.http.get(this.roleUrl + args, Constants.TokenHttpHeaders).pipe(
      retry(3),
      map((res: any) => res.data)
    );
  }


  // TODO implement delete user
  deleteRole(roleId) {
    return this.http.delete(this.roleUrl + '/' + roleId, Constants.TokenHttpHeaders).pipe(
      retry(3)
    );
  }

  updateRole(roleData: any, roleId: number ) {
    return this.http.put(this.roleUrl + '/' + roleId, roleData, Constants.TokenHttpHeaders).pipe(
      retry(3)
    );
  }

  getRoleById(roleId: number): Observable<Role> {
    return this.http.get(this.roleUrl + '/' + roleId, Constants.TokenHttpHeaders).pipe(
      retry(3),
      map((res: any) => new Role(res.data))
    );
  }
}
