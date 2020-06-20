import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ProductService} from '../../../../../core/services/product/product.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../../../core/models/product/product.model';
import {NgForm} from '@angular/forms';
import {Specification} from '../../../../../core/models/product/specification.model';

@Component({
  selector: 'app-manage-key-feature',
  templateUrl: './product-specifications.component.html',
  styleUrls: ['./product-specifications.component.scss', '../../../../../core/custom-table.scss']
})

export class ProductSpecificationsComponent implements OnInit {
  public itemsPerView = 5;
  page: number;
  specifications = new Array<Specification>();
  pageSize: number;
  product: Product;
  productId: number;
  totalRecords: number;
  public specificationModal: NgbModalRef;
  state = {isLoading: false, isLoaded: false};
  isLoadingAction: boolean;
  public isEditingSpecification: boolean;
  public activeSpecification: Specification;

  public specificationObj = {
    'productId': null,
    'name': null,
    'value': null
  };

  @ViewChild(ProductSpecificationsComponent) table: ProductSpecificationsComponent;
  actionId: any;
  isDeletingAction = false;
  public isCreatingSpecification = false;

  constructor(private productService: ProductService, private router: Router, private modalService: NgbModal,
              private toaster: ToastrService, private activatedRoute: ActivatedRoute) {
    this.totalRecords = 0;
    this.pageSize = 20;
    this.page = 1;
  }

  ngOnInit() {

    this.activatedRoute.parent.data.subscribe((data: any) => {
      this.specifications = new Product(data.product).specifications.map(ele => new Specification(ele));
      this.productId = +data.product.id;
    });
  }

  deleteSpecification(specificationId) {
    this.actionId = specificationId;
    this.isLoadingAction = true;
    this.productService.deleteSpecification(this.productId, specificationId).subscribe(data => {
          this.isLoadingAction = false;
          this.actionId = null;
          this.specifications = this.specifications.filter(specification => specification.id !== specificationId);
          this.toaster.success('Deleted Successfully');
        },
        err => {
          this.isLoadingAction = false;
          this.actionId = null;
          this.toaster.error(err.error.message, 'Error');
        });
  }

  openSpecificationModal(content, specification: Specification) {
    this.isEditingSpecification = false;
    this.specificationObj.name = '';
    this.specificationObj.value = '';
    this.activeSpecification = null;
    if (specification) {
      this.specificationObj.name = specification.name;
      this.specificationObj.value = specification.value;
      this.activeSpecification = specification;
      this.isEditingSpecification = true;
    }

    this.specificationModal = this.modalService.open(content, { size: 'lg', centered: true  });

    this.specificationModal.result.then(
        result => {
          // console.log(result);
        },
        reason => {

        }
    );
  }

  createSpecification(f: NgForm): void {
    this.isCreatingSpecification = true;
    this.specificationObj.productId = this.productId;
    this.specificationObj.name = f.value.name;
    this.specificationObj.value = f.value.value;
    this.productService.addSpecification(this.specificationObj).subscribe((res: any) => {
      console.log(res);
      const newSpecification = res.data;
      this.specifications.push(newSpecification);
      this.toaster.success('', 'Specification Added');
      this.isCreatingSpecification = false;
      f.resetForm();
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingSpecification = false;
    });
  }

  updateSpecification(f: NgForm): void {
    this.isCreatingSpecification = true;
    this.productService.updateSpecification(this.specificationObj, this.activeSpecification.id).subscribe((res: any) => {
      this.toaster.success('', 'Updated Successfully');
      this.specifications = this.specifications.filter(specification => specification.id !== this.activeSpecification.id);
      console.log(this.specifications);
      this.specifications.push(new Specification(res.data));
      this.isCreatingSpecification = false;
      this.specificationModal.close();
      f.resetForm();
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingSpecification = false;
    });
  }

}
