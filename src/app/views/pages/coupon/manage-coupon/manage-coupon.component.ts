import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CouponService} from '../../../../core/services/coupon/coupon.service';
import {Coupon} from '../../../../core/models/coupon/coupon.model';
import swal from 'sweetalert2';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Product} from '../../../../core/models/product/product.model';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-manage-coupon',
  templateUrl: './manage-coupon.component.html',
  styleUrls: ['./manage-coupon.component.scss', '../../../../core/custom-table.scss']
})

export class ManageCouponComponent implements OnInit {

  public itemsPerView = 5;
  page: number;
  coupons = new Array<Coupon>();
  coupon: Coupon;
  pageSize: number;
  totalRecords: number;
  public couponModal: NgbModalRef;
  state = {isLoading: false, isLoaded: false};
  isLoadingAction: boolean;
  public isEditingCoupon: boolean;
  public activeCoupon: Coupon;

  public couponObj = {
    'discountPercentage': null,
    'expireDate': null
  };


  @ViewChild(ManageCouponComponent) table: ManageCouponComponent;
  actionId: any;
  isDeletingAction = false;
  public isCreatingCoupon = false;

  constructor(private couponService: CouponService, private router: Router, private modalService: NgbModal,
              private toaster: ToastrService, private route: ActivatedRoute) {
    this.totalRecords = 0;
    this.pageSize = 20;
    this.page = 1;
  }

  ngOnInit() {
    const res = this.route.snapshot.data['coupons'];
    console.log('rows', res);
    this.page = res.page;
    this.totalRecords = res.totalRecords;
    this.coupons = res.content.map(cat => new Coupon(cat));
  }

  setPage() {
    this.state.isLoading = true;
    // this.page = p.page;
    this.couponService.getCoupons().subscribe((res: any) => {
      this.state.isLoaded = true;
      this.state.isLoading = false;
      console.log(res);
      this.page = res.page;
      this.totalRecords = res.totalRecords;
      this.coupons = res.content.map(coupon => new Coupon(coupon));
    });
  }

  gotoCoupon(id) {
    console.log('id = ', id);
    this.router.navigate(['/coupon/manage/' + id]);
  }

  deleteCoupon(coupon: Coupon) {
    (swal as any).fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete ' + coupon.couponCode + ' Coupon',
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
            this.actionId = coupon.id;
            this.isDeletingAction = true;
            this.couponService.deleteCoupon(coupon.id).subscribe(data => {
                this.isDeletingAction = false;
                this.setPage();
                this.toaster.success('Coupon Deleted Successfully');
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

  openCouponModal(content, coupon: Coupon) {
    this.isEditingCoupon = false;
    if (coupon) {
      console.log(coupon);
      this.couponObj.expireDate = coupon.expireDate.split('T')[0];
      this.couponObj.discountPercentage = coupon.discountPercentage;
      this.activeCoupon = coupon;
      this.isEditingCoupon = true;
    }

    this.couponModal = this.modalService.open(content, { size: 'lg', centered: true  });

    this.couponModal.result.then(
        result => {
          // console.log(result);
        },
        reason => {

        }
    );
  }

  createCoupon(): void {
    this.isCreatingCoupon = true;
    this.couponService.createCoupon(this.couponObj).subscribe((res: any) => {
      this.toaster.success('', 'Created Successfully');
      this.isCreatingCoupon = false;
      this.couponObj.discountPercentage = null;
      this.couponObj.expireDate = null;
      this.setPage();
      this.couponModal.close();
    }, err => {
      console.log(err);
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingCoupon = false;
    });
  }

  updateCoupon(): void {
    this.isCreatingCoupon = true;
    console.log('%%', this.couponObj);

    this.couponService.updateCoupon(this.couponObj, this.activeCoupon.id).subscribe((res: any) => {
      this.toaster.success('', 'Updated Successfully');
      this.isCreatingCoupon = false;
      this.couponModal.close();
      this.setPage();
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingCoupon = false;
    });
  }

}
