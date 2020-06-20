import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert2';
import {ProductService} from '../../../../../core/services/product/product.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {pipe} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/internal/operators';
import {Product} from '../../../../../core/models/product/product.model';
import {UtilityService} from '../../../../../core/services/utility.service';
import {Code} from '../../../../../core/models/code.model';
import {Category} from '../../../../../core/models/category/category.model';
import {NgForm} from '@angular/forms';
import {CategoryService} from '../../../../../core/services/category/category.service';
import {SubscriptionService} from '../../../../../core/services/sponsorship/subscription.service';
import {Subscription} from '../../../../../core/models/subscription/subscription.model';
import {Customer} from '../../../../../core/models/user/customer.model';

@Component({
  selector: 'app-manage-product',
  templateUrl: './customer-sponsorship.component.html',
  styleUrls: ['./customer-sponsorship.component.scss', '../../../../../core/custom-table.scss']
})

export class CustomerSponsorshipComponent implements OnInit {

  public itemsPerView = 10;
  filterText: string;
  private totalPages: number;
  public searchTerm = new Subject<string>();
  private searchText: string;

  status: number;
  page: number;
  subscriptions: Subscription[];
  pageSize: number;
  totalRecords: number;
  actionId: any;
  isFiltering = false;
  isLoadingAction: boolean;
  isDeletingAction = false;

  public sponsorshipModal: NgbModalRef;
  state = {isLoading: false, isLoaded: false};

  public isEditingSponsor: boolean;
  public activeSponsor: Category;


  public products: Product[];
  public isLoadingProducts: boolean;
  isCreatingSponsor: boolean;

  public paymentTypes: string[];
  isLoadingPaymentTypes: boolean;

  hovered = 0;

  public filterObj: any = {
    'categoryId': null,
    'productName': '',
    'status': 2,
  };

  public sponsorObj = {
    'paymentType': null,
    'productId': null,
    'quantity': null,
    'subscriptionDate': null,
    'userId': null
  };

  modalReference: NgbModalRef;
   customerId: number;

  constructor(private productService: ProductService, private subscriptionService: SubscriptionService, private router: Router, private modalService: NgbModal,
              private toaster: ToastrService, private route: ActivatedRoute, private utilService: UtilityService,
              private activatedRoute: ActivatedRoute) {

    this.pageSize = 10;
    this.page = 1;
    this.status = 2;
  }

  // onFilter() {
  //   this.isFiltering = true;
  //   console.log(this.filterObj);
  //   this.setPage(1, () => {
  //     this.isFiltering = false;
  //     this.modalReference.close();
  //   });
  // }

  // clearFilter(filterFormRef) {
  //   filterFormRef.resetForm({});
  //   this.setPage(1, () => {
  //     this.modalReference.close();
  //   });
  // }


  ngOnInit() {
    // this.route.parent.data.subscribe((data: any) => {
    //   this.subscriptions =  data.supscriptions.map(subscription => new Subscription(subscription));
    //   console.log('||', data);
    // });

    this.route.parent.data.subscribe((data: any) => {
      this.customerId = data.subscriptions[1];
      // this.customer = new Customer(data.customer.data) ;
      data.subscriptions[0].subscribe(res => {
        console.log(res);
         const { page, totalRecords, content } = res;
         this.page = page;
         this.totalRecords = totalRecords;
         this.subscriptions = content.map(subscription => new Subscription(subscription));
      });

    });

    this.searchTerm
        .pipe(debounceTime(500))
        .subscribe(search => {
          this.searchText = search;
          this.getPaginatedData(1);
        });

    this.getProducts();
    this.getPaymentTypes();
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

  getPaymentTypes(): void {
    this.isLoadingPaymentTypes = true;
    this.utilService.getPaymentTypes().subscribe((res: any) => {
      this.isLoadingPaymentTypes = false;
      this.paymentTypes = res.data;
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isLoadingPaymentTypes = false;
    });
  }

  // onSubmitSponsorship(formValue): void {
  //   this.createSponsorship(formValue);
  // }

  createSponsorship(): void {
    this.sponsorObj.userId = this.customerId;
    console.log(this.sponsorObj);
    this.isCreatingSponsor = true;
    this.subscriptionService.subscribeCustomer(this.sponsorObj).subscribe((res: any) => {
      this.toaster.success('', 'Subscription Created Successfully');
      this.isCreatingSponsor = false;
      this.setPage(this.page, () => {
        this.sponsorObj.paymentType = null;
        this.sponsorObj.productId = null;
        this.sponsorObj.subscriptionDate = null;
        this.sponsorObj.quantity = null;
      });
      this.sponsorshipModal.close();
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingSponsor = false;
    });
  }

  updateCategory(): void {
    // this.isCreatingCategory = true;
    // console.log('%%', this.categoryObj);
    //
    // this.categoryService.updateCategory(this.categoryObj, this.activeCategory.id).subscribe((res: any) => {
    //   this.toaster.success('', 'Updated Successfully');
    //   this.isCreatingCategory = false;
    //   this.categoryModal.close();
    //   this.setPage();
    // }, err => {
    //   this.toaster.error(err.error.message, 'Error');
    //   this.isCreatingCategory = false;
    // });
  }

  setPage(p, callback) {
    this.page = p;
    this.subscriptionService.getProductSubscriptions(this.page, this.pageSize, null, this.customerId).subscribe((res: any) => {
      if (callback) {
        callback();
      }
      this.page = res.page;
      this.totalRecords = res.totalRecords;
      this.subscriptions = res.content.map(subscription => new Subscription(subscription));

      console.log(this.subscriptions);
    });
  }

  filterData = (value: string) => {
    this.searchTerm.next(value.trim());
  }

  getPaginatedData = (page: number) => {
    console.log(page);
    this.setPage(page, () => {});
  }

  openSponsorshipModal(content, category: Category) {
    this.isEditingSponsor = false;
    if (category) {
      // console.log(category);
      // this.categoryObj.name = category.name;
      // this.categoryObj.description = category.description;
      this.activeSponsor = category;
      this.isEditingSponsor = true;
    }

    this.sponsorshipModal = this.modalService.open(content, { size: 'lg', centered: true  });

    this.sponsorshipModal.result.then(
        result => {
          // console.log(result);
        },
        reason => {

        }
    );
  }


  deleteSubscription(subscription) {
    console.log('subscription : ', subscription);
    // swal.fire('Hello world!')//fire
    (swal as any).fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete ' + subscription.firstName + ' ' + subscription.productName ,
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
          this.actionId = subscription.id;
          this.isLoadingAction = true;
          this.subscriptionService.deleteSubscription(subscription.id).subscribe(data => {
              this.isDeletingAction = false;
              this.setPage(1, () => this.toaster.success('Subscription Deleted Successfully'));
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

  //
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
  //
  // activateProduct(productId) {
  //   this.actionId = productId;
  //   this.isLoadingAction = true;
  //   this.productService.activateProduct(productId).subscribe(data => {
  //         this.isLoadingAction = false;
  //         this.actionId = null;
  //         console.log(data);
  //         this.products.filter(product => product.id === productId)[0].status = true;
  //         this.toaster.success('Product Activated Successfully');
  //       },
  //       err => {
  //         console.log(err);
  //         this.isLoadingAction = false;
  //         this.actionId = null;
  //         this.toaster.error(err.error.message, 'Error');
  //       });
  // }
  //
  // openFilterModal(modalRef) {
  //   this.modalReference =  this.modalService.open(modalRef);
  // }


}
