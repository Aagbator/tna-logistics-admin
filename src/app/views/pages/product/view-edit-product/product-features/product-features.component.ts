import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ProductService} from '../../../../../core/services/product/product.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../../../core/models/product/product.model';
import {KeyFeature} from '../../../../../core/models/product/key-features.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-manage-key-feature',
  templateUrl: './product-features.component.html',
  styleUrls: ['./product-features.component.scss', '../../../../../core/custom-table.scss']
})

export class ProductFeaturesComponent implements OnInit {
  public itemsPerView = 5;
  page: number;
  keyFeatures = new Array<KeyFeature>();
  pageSize: number;
  product: Product;
  productId: number;
  totalRecords: number;
  public keyFeatureModal: NgbModalRef;
  state = {isLoading: false, isLoaded: false};
  isLoadingAction: boolean;
  public isEditingKeyFeature: boolean;
  public activeKeyFeature: KeyFeature;

  public keyFeatureObj = {
    'productId': null,
    'value': null

  };

  @ViewChild(ProductFeaturesComponent) table: ProductFeaturesComponent;
  actionId: any;
  isDeletingAction = false;
  public isCreatingKeyFeature = false;

  constructor(private productService: ProductService, private router: Router, private modalService: NgbModal,
              private toaster: ToastrService, private activatedRoute: ActivatedRoute) {
    this.totalRecords = 0;
    this.pageSize = 20;
    this.page = 1;
  }

  ngOnInit() {

    this.activatedRoute.parent.data.subscribe((data: any) => {
      this.keyFeatures = new Product(data.product).keyFeatures.map(ele => new KeyFeature(ele));
      this.productId = +data.product.id;
      console.log('$keyFeatures', this.keyFeatures);
    });
  }

  deleteKeyFeature(keyFeatureId) {
    this.actionId = keyFeatureId;
    this.isLoadingAction = true;
    this.productService.deleteKeyFeature(this.productId, keyFeatureId).subscribe(data => {
          this.isLoadingAction = false;
          this.actionId = null;
          this.keyFeatures = this.keyFeatures.filter(keyFeature => keyFeature.id !== keyFeatureId);
          this.toaster.success('Deleted Successfully');
        },
        err => {
          this.isLoadingAction = false;
          this.actionId = null;
          this.toaster.error(err.error.message, 'Error');
        });
  }

  openKeyFeatureModal(content, keyFeature: KeyFeature) {
    this.isEditingKeyFeature = false;
    this.keyFeatureObj.value = '';
    this.activeKeyFeature = null;
    if (keyFeature) {
      this.keyFeatureObj.value = keyFeature.value;
      this.activeKeyFeature = keyFeature;
      this.isEditingKeyFeature = true;
    }

    this.keyFeatureModal = this.modalService.open(content, { size: 'lg', centered: true  });

    this.keyFeatureModal.result.then(
        result => {
          // console.log(result);
        },
        reason => {

        }
    );
  }

  createKeyFeature(f: NgForm): void {
    this.isCreatingKeyFeature = true;
    this.keyFeatureObj.productId = this.productId;
    this.keyFeatureObj.value = f.value.value;
    this.productService.addKeyFeature(this.keyFeatureObj).subscribe((res: any) => {
      console.log(res);
      const newFeature = res.data;
      this.keyFeatures.push(newFeature);
      this.toaster.success('', 'KeyFeature Added');
      this.isCreatingKeyFeature = false;
      f.resetForm();
      // this.setPage();
      // this.keyFeatureModal.close();
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingKeyFeature = false;
    });
  }

  updateKeyFeature(f: NgForm): void {
    this.isCreatingKeyFeature = true;
    this.productService.updateKeyFeature(this.keyFeatureObj, this.activeKeyFeature.id).subscribe((res: any) => {
      this.toaster.success('', 'Updated Successfully');
      this.keyFeatures = this.keyFeatures.filter(keyFeature => keyFeature.id !== this.activeKeyFeature.id);
      console.log(this.keyFeatures);
      this.keyFeatures.push(new KeyFeature(res.data));
      this.isCreatingKeyFeature = false;
      this.keyFeatureModal.close();
      f.resetForm();
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingKeyFeature = false;
    });
  }

}
