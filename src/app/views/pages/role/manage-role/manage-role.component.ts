import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RoleService} from '../../../../core/services/role/role.service';
import {Role} from '../../../../core/models/role/role.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss', '../../../../core/custom-table.scss']
})

export class ManageRoleComponent implements OnInit {

  page: number;
  rows = new Array<Role>();
  pageSize: number;
  totalRecords: number;
  state = {isLoading: false, isLoaded: false};


  @ViewChild(ManageRoleComponent) table: ManageRoleComponent;
  actionId: any;
  isDeletingAction = false;

  constructor(private roleService: RoleService, private router: Router,
              private toaster: ToastrService, private route: ActivatedRoute) {
    this.totalRecords = 0;
    this.pageSize = 20;
    this.page = 1;
  }

  ngOnInit() {
    const res = this.route.snapshot.data['roles'];
    console.log('rows', res);
    this.page = res.page;
    this.totalRecords = res.totalRecords;
    this.rows = res.content;
  }

  setPage(p) {
    this.state.isLoading = true;
    this.page = p.page;
    this.roleService.getRoles(1, 10).subscribe((res: any) => {
      this.state.isLoaded = true;
      this.state.isLoading = false;
      console.log(res);
      this.page = res.page;
      this.totalRecords = res.totalRecords;
      this.rows = res.content;
    });
  }

  gotoRole(id) {
    console.log('id = ', id);
    this.router.navigate(['/role/manage/' + id]);
  }

  deleteRole(role) {
    console.log('this.actionId : ' + this.actionId + ' roleId : ' + role.id);
    // swal.fire('Hello world!')//fire
    (swal as any).fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete ' + role.name + ' role',
      type: 'error',
      confirmButtonColor: '#ff6265',
      cancelButtonColor: '#cccccc',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      showConfirmButton: true,
      showCancelButton: true
    })
      .then((willDelete) => {
          if (willDelete.value) {
            this.actionId = role.id;
            this.isDeletingAction = true;
            this.roleService.deleteRole(role.id).subscribe(data => {
                this.isDeletingAction = false;
                this.setPage({ page: 1 });
                this.toaster.success('Role Deleted Successfully');
                this.actionId = null;
              },
              err => {
                this.isDeletingAction = false;
                this.toaster.error(err.error.message, 'Error');
              });
            // swal.fire('Success');
          }
        this.isDeletingAction = false;
        this.actionId = null;
        console.log(willDelete);
      });
  }

}
