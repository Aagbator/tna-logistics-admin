import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert2';
import {ProductService} from '../../../../core/services/product/product.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {pipe} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/internal/operators';
import {Product} from '../../../../core/models/product/product.model';
import {UtilityService} from '../../../../core/services/utility.service';
import {NgForm} from '@angular/forms';
import {Subscription} from '../../../../core/models/subscription/subscription.model';
import {SubscriptionService} from '../../../../core/services/sponsorship/subscription.service';
import {Category} from '../../../../core/models/category/category.model';
import {Payout} from '../../../../core/models/payout/payout.model';

@Component({
  selector: 'app-manage-payouts',
  templateUrl: './manage-payouts.component.html',
  styleUrls: ['./manage-payouts.component.scss', '../../../../core/custom-table.scss']
})

export class ManagePayoutsComponent implements OnInit {

  public itemsPerView = 10;
  filterText: string;
  private totalPages: number;
  public searchTerm = new Subject<string>();
  private searchText: string;

  status: number;
  page: number;
  payouts: Payout[];
  pageSize: number;
  totalRecords: number;
  actionId: any;
  isDeletingAction = false;
  isFiltering = false;
  isLoadingAction: boolean;
  isLoadingPayouts: boolean;

  public payoutModal: NgbModalRef;
  activePayout: Payout;

  public products: Product[];
  public isLoadingProducts: boolean;

  public selectedProductId = null;

  modalReference: NgbModalRef;
  productId: number;

  constructor(private productService: ProductService, private router: Router, private modalService: NgbModal,
              private toaster: ToastrService, private route: ActivatedRoute, private utilService: UtilityService,
              private activatedRoute: ActivatedRoute, private subscriptionService: SubscriptionService ) {
    this.activatedRoute.params.subscribe(params => {
      this.productId = +params['id'];
    });
    this.pageSize = 20;
    this.page = 1;
    this.status = 2;
  }

  onFilter() {
    this.isFiltering = true;
    this.setPage(1, () => {
      this.isFiltering = false;
      this.modalReference.close();
    });
  }

  clearFilter(filterFormRef) {
    filterFormRef.resetForm({});
    this.setPage(1, () => {
      this.modalReference.close();
    });
  }


  ngOnInit() {
    const res = this.route.snapshot.data['payout'];

    this.getProducts();

    this.searchTerm
      .pipe(debounceTime(500))
      .subscribe(search => {
        this.searchText = search;
        this.getPaginatedData(1);
    });
  }

  onSelectProduct = () => {
    this.isLoadingPayouts = true;
    this.setPage(1, () => {
      this.isLoadingPayouts = false;
    });
  }


  getProducts(): void {
    this.isLoadingProducts = true;
    this.productService.getProducts().subscribe((res: any) => {
      this.isLoadingProducts = false;
      this.products = res.content.map(product => new Product(product));
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isLoadingProducts = false;
    });
  }

  openPayoutModal(content, payout: Payout) {

    this.activePayout = new Payout(payout);
    this.payoutModal = this.modalService.open(content, { size: 'lg', centered: true  });

    this.payoutModal.result.then(
        result => {
          // console.log(result);
        },
        reason => {

        }
    );
  }

  setPage(p, callback) {
    this.page = p;
    this.subscriptionService.getMaturedInvestments(this.page, this.itemsPerView, this.selectedProductId).subscribe((res: any) => {
      if(callback) {
        callback();
      }
      this.page = res.page;
      this.totalRecords = res.totalRecords;
      this.payouts = res.content.map(subscription => new Payout(subscription));
      console.log('***', this.payouts);
    });
  }

  filterData = (value: string) => {
    this.searchTerm.next(value.trim());
  }

  getPaginatedData = (page: number) => {
    console.log(page);
    this.setPage(page, () => {});
  }


  markPayoutAsPaid(payout) {
    console.log('this.actionId : ' + this.actionId + ' productId : ' + payout.id);
    // swal.fire('Hello world!')//fire
    (swal as any).fire({
      title: 'Are you sure?',
      text: 'Confirm payment to ' + payout.firstName + ' ' + payout.lastName ,
      type: 'info',
      confirmButtonColor: '#47b76c',
      cancelButtonColor: '#cccccc',
      confirmButtonText: 'Yes, I have Paid',
      cancelButtonText: 'Cancel',
      showConfirmButton: true,
      showCancelButton: true
    })
      .then((willConfirm) => {
        if (willConfirm.value) {
          this.actionId = payout.id;
          this.isLoadingAction = true;
          this.subscriptionService.markSubscriptionAsPaid(payout.id).subscribe(data => {
              this.isDeletingAction = false;
              this.setPage(this.page, () => this.toaster.success('Marked as paid Successfully'));
              // this.toaster.success('product Deleted Successfully');
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

  // deactivateProduct(productId) {
  //   this.actionId = productId;
  //   this.isLoadingAction = true;
  //   this.productService.deactivateProduct(productId).subscribe(data => {
  //         this.isLoadingAction = false;
  //         this.actionId = null;
  //         console.log(data);
  //         this.products.filter(product => product.id === productId)[0].status = false;
  //         this.toaster.success('Product Deactivated Successfully');
  //       },
  //       err => {
  //         this.isLoadingAction = false;
  //         this.actionId = null;
  //         this.toaster.error(err.error.message, 'Error');
  //       });
  // }

  // activateProduct(subscriptionId) {
  //   this.actionId = subscriptionId;
  //   this.isLoadingAction = true;
  //   this.productService.activateProduct(subscriptionId).subscribe(data => {
  //         this.isLoadingAction = false;
  //         this.actionId = null;
  //         console.log(data);
  //         // this.subscriptions.filter(subscription => subscription.id === subscriptionId)[0].status = true;
  //         this.toaster.success('Product Activated Successfully');
  //       },
  //       err => {
  //         console.log(err);
  //         this.isLoadingAction = false;
  //         this.actionId = null;
  //         this.toaster.error(err.error.message, 'Error');
  //       });
  // }

  openFilterModal(modalRef) {
    this.modalReference =  this.modalService.open(modalRef);
  }

  gotoProduct(id) {
    console.log(id);
    this.router.navigate(['/product/manage/' + id]);
  }

}
