import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert2';
import {UserService} from '../../../../core/services/user/user.service';
import {Customer} from '../../../../core/models/user/customer.model';
import {UtilityService} from '../../../../core/services/utility.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {pipe} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/internal/operators';
import {BankTransferSubscriptionService} from '../../../../core/services/sponsorship/bank-transfer-subscription.service';
import {Subscription} from '../../../../core/models/subscription/subscription.model';

@Component({
  selector: 'app-manage-bank-payments',
  templateUrl: './manage-bank-payments.component.html',
  styleUrls: ['./manage-bank-payments.component.scss', '../../../../core/custom-table.scss']
})

export class ManageBankPaymentsComponent implements OnInit {

  public itemsPerView = 5;
  filterText: string;
  private totalPages: number;
  public searchTerm = new Subject<string>();
  private searchText: string;

  page: number;
  bankPayments: Subscription[];
  pageSize: number;
  totalRecords: number;
  state = {isLoading: false, isLoaded: false};
  actionId: any;
  isDeletingAction = false;
  isLoadingAction: boolean;

  constructor(private bankTransferSubscriptionService: BankTransferSubscriptionService, private router: Router,
              private toaster: ToastrService, private route: ActivatedRoute) {
    // this.totalRecords = 0;
    this.pageSize = 20;
    this.page = 1;
  }

  ngOnInit() {
    const res = this.route.snapshot.data['customers'];

    this.searchTerm
        .pipe(debounceTime(500))
        .subscribe(search => {
          this.searchText = search;
          this.getPaginatedData(1);
        });

    this.page = res.page;
    this.totalRecords = res.totalRecords;
    this.bankPayments = res.content.map(bankPayment => new Subscription(bankPayment));
  }

  setPage(p) {
    this.state.isLoading = true;
    this.page = p.page;
    this.bankTransferSubscriptionService.getBankTransferSubscriptions(this.page, this.itemsPerView, this.searchText, null).subscribe((res: any) => {
      this.state.isLoaded = true;
      this.state.isLoading = false;
      this.page = res.page;
      this.totalRecords = res.totalRecords;
      this.bankPayments = res.content.map(bankPayment => new Subscription(bankPayment));
    });
  }

  filterData = (value: string) => {
      console.log(value);
    this.searchTerm.next(value.trim());
  }

  getPaginatedData = (page: number) => {
    this.page = page;
    this.bankTransferSubscriptionService.getBankTransferSubscriptions(this.page, this.itemsPerView, this.searchText, null).subscribe(res => {

      this.processPagedData(res);
    });
  }

  processPagedData(data) {
    const paymentReservations = [];
    this.totalPages = data.totalPages;
    this.totalRecords = data.totalRecords;
    this.page = data.page;
    // this.itemsPerView = data.pageSize;
    for (const bankPayment of data.content) {
        paymentReservations.push(new Subscription(bankPayment));
    }
    this.bankPayments = paymentReservations;
  }


    approveBankTransfer(paymentId) {
        // swal.fire('Hello world!')//fire
        (swal as any).fire({
            title: 'Are you sure?',
            text: 'Do you really want to approve this payment ',
            type: 'success',
            confirmButtonColor: '#47b76c',
            cancelButtonColor: '#cccccc',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((willApprove) => {
                if (willApprove.value) {
                    this.actionId = paymentId;
                    this.isLoadingAction = true;
                    this.bankTransferSubscriptionService.approveBankTransferSubscription(paymentId).subscribe(data => {
                            this.isLoadingAction = false;
                            this.setPage({ page: this.page });
                            this.toaster.success('Approved Successfully');
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



  deleteBankTransfer(payment) {
    // swal.fire('Hello world!')//fire
    (swal as any).fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete ' + payment.firstName + ' ' + payment.productName ,
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
              this.actionId = payment.id;
            this.isLoadingAction = true;
            this.bankTransferSubscriptionService.deleteBankTransferSubscription(payment.id).subscribe(data => {
                  this.isLoadingAction = false;
                  this.setPage({ page: this.page });
                  this.toaster.success('Deleted Successfully');
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
}
