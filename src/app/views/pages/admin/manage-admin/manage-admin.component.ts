import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert2';
import {UserService} from '../../../../core/services/user/user.service';
import {Admin} from '../../../../core/models/user/admin.model';
import {UtilityService} from '../../../../core/services/utility.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {pipe} from 'rxjs';
import {distinctUntilChanged} from "rxjs/internal/operators";

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.scss', '../../../../core/custom-table.scss']
})

export class ManageAdminComponent implements OnInit {

  public itemsPerView = 5;
  filterText: string;
  private totalPages: number;
  public searchTerm = new Subject<string>();
  private searchText: string;

  status: number;
  page: number;
  admins: Admin[];
  pageSize: number;
  totalRecords: number;
  state = {isLoading: false, isLoaded: false};
  actionId: any;
  isDeletingAction = false;
  isLoadingAction: boolean;

  constructor(private userService: UserService, private router: Router,
              private toaster: ToastrService, private route: ActivatedRoute) {
    // this.totalRecords = 0;
    this.pageSize = 20;
    this.page = 1;
    this.status = 2;
  }

  ngOnInit() {
    const res = this.route.snapshot.data['admins'];

    this.searchTerm
      .pipe(debounceTime(500))
      .subscribe(search => {
        this.searchText = search;
        this.getPaginatedData(1);
    });

    // this.searchTerm.debounceTime(1000)
    //   .distinctUntilChanged()
    //   .subscribe(search => {
    //     this.searchText = search;
    //     this.getPaginatedData(1);
    //   });
    console.log('rows', res);
    this.page = res.page;
    this.totalRecords = res.totalRecords;
    this.admins = res.content.map(admin => new Admin(admin));
  }

  setPage(p) {
    this.state.isLoading = true;
    this.page = p.page;
    this.userService.getAdmins(this.page, this.itemsPerView, this.searchText, this.status).subscribe((res: any) => {
      this.state.isLoaded = true;
      this.state.isLoading = false;
      this.page = res.page;
      this.totalRecords = res.totalRecords;
      this.admins = res.content.map(admin => new Admin(admin));
    });
  }

  // getAdmins = () => {
  //   this.isLoadingData = true;
  //   this.userService.getAdmins().subscribe(res => {
  //     this.isLoadingData = false;
  //     console.log(res);
  //     this.processPagedData(res);
  //   });
  // }

  filterData = (value: string) => {
    this.searchTerm.next(value.trim());
  }

  getPaginatedData = (page: number) => {
    this.page = page;
    this.userService.getAdmins(this.page, this.itemsPerView, this.searchText, this.status).subscribe(res => {

      this.processPagedData(res);
    });
  }

  processPagedData(data) {
    console.log('data', data);

    const userData = [];
    this.totalPages = data.totalPages;
    this.totalRecords = data.totalRecords;
    this.page = data.page;
    // this.itemsPerView = data.pageSize;
    for (const admin of data.content) {
      userData.push(new Admin(admin));
    }
    this.admins = userData;
  }

  blockUser(userId) {
    this.actionId = userId;
    this.isLoadingAction = true;
    this.userService.blockUser(userId).subscribe(data => {
        this.isLoadingAction = false;
        this.actionId = null;
        console.log(data);
        this.admins.filter(user => user.id === userId)[0].active = false;
        this.toaster.success('Admin Blocked Successfully');
      },
      err => {
        this.isLoadingAction = false;
        this.actionId = null;
        this.toaster.error(err.error.message, 'Error');
      });
  }

  unBlockUser(userId) {
    this.actionId = userId;
    this.isLoadingAction = true;
    this.userService.unBlockUser(userId).subscribe(data => {
        this.isLoadingAction = false;
        this.actionId = null;
        console.log(data);
        this.admins.filter(user => user.id === userId)[0].active = true;
        this.toaster.success('Admin Unblocked Successfully');
      },
      err => {
        console.log('******');
        console.log(err);
        this.isLoadingAction = false;
        this.actionId = null;
        this.toaster.error(err.error.message, 'Error');
      });
  }

  // deleteAdmin(userId) {
  //   this.actionId = userId;
  //   this.isLoadingAction = true;
  //   this.userService.deleteUser(userId).subscribe(data => {
  //       this.isLoadingAction = false;
  //       console.log(data);
  //       this.toaster.success('Admin Deleted Successfully');
  //       this.getAdmins();
  //     },
  //     err => {
  //       this.isLoadingAction = false;
  //       this.toaster.error(err.error.message, 'Error');
  //     });
  // }

  deleteAdmin(user) {
    console.log('this.actionId : ' + this.actionId + ' userId : ' + user.id);
    // swal.fire('Hello world!')//fire
    (swal as any).fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete ' + user.firstName + ' account',
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
          this.actionId = user.id;
          this.isLoadingAction = true;
          this.userService.deleteUser(user.id).subscribe(data => {
              this.isDeletingAction = false;
              this.setPage({ page: 1 });
              this.toaster.success('Admin Deleted Successfully');
              this.actionId = null;
            },
            err => {
              this.isLoadingAction = false;
              this.toaster.error(err.error.message, 'Error');
            });
        }
        this.isLoadingAction = false;
        this.actionId = null;
      });
  }


  gotoAdmin(id) {
    console.log(id);
    this.router.navigate(['/admin/manage/' + id]);
  }

}
