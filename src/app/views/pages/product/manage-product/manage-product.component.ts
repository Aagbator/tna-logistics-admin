import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert2';
import {ProductService} from '../../../../core/services/product/product.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../../core/models/product/product.model';
import {UtilityService} from '../../../../core/services/utility.service';
import {Category} from '../../../../core/models/category/category.model';
import {CategoryService} from '../../../../core/services/category/category.service';
import {SectionService} from '../../../../core/services/section/section.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss', '../../../../core/custom-table.scss']
})

export class ManageProductComponent implements OnInit {

  public itemsPerView = 10;
  filterText: string;
  private totalPages: number;
  public searchTerm = new Subject<string>();
  private searchText: string;

  status: number;
  page: number;
  products: Product[];
  pageSize: number;
  totalRecords: number;
  actionId: any;
  isDeletingAction = false;
  isFiltering = false;
  isLoadingAction: boolean;

  public categories: Category[];
  public isLoadingCategories: boolean;

  hovered = 0;

  public filterObj: any = {
    'categoryId': null,
    'searchQuery': '',
    'productStatus': 'ALL',
  };

  @Input() sectionId;
  @Output() sectionUpdated = new EventEmitter();

  modalReference: NgbModalRef;
   productId: number;

  constructor(private productService: ProductService, private router: Router, private modalService: NgbModal,
              private toaster: ToastrService, private route: ActivatedRoute, private utilService: UtilityService,
              private activatedRoute: ActivatedRoute, private categoryService: CategoryService, private sectionService: SectionService) {
    this.activatedRoute.params.subscribe(params => {
      this.productId = +params['id'];
    });
    this.pageSize = 20;
    this.page = 1;
    this.status = 2;
  }

  onFilter() {
    this.isFiltering = true;
    console.log(this.filterObj);
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
    const res = this.route.snapshot.data['products'];
    this.setPage(1, () => {});

    this.getCategories();

    this.searchTerm
      .pipe(debounceTime(500))
      .subscribe(search => {
        this.searchText = search;
        this.getPaginatedData(1);
    });
  }


  getCategories(): void {
    this.isLoadingCategories = true;
    this.categoryService.getCategories().subscribe((res: any) => {
      this.isLoadingCategories = false;
      this.categories = res.map(category => new Category(category));
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isLoadingCategories = false;
    });
  }

  setPage(p, callback) {
    this.page = p;
    this.productService.getProducts(this.page, this.itemsPerView, this.filterObj.categoryId, this.filterObj.searchQuery, this.filterObj.productStatus).subscribe((res: any) => {
      if(callback) {
        callback();
      }
      this.page = res.page;
      this.totalRecords = res.totalRecords;
      this.products = res.content.map(product => new Product(product));

      console.log(this.products);
    });
  }

  filterData = (value: string) => {
    this.searchTerm.next(value.trim());
  }

  getPaginatedData = (page: number) => {
    console.log(page);
    this.setPage(page, () => {});
  }


  deleteProduct(product) {
    (swal as any).fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete ' + product.name ,
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
          this.actionId = product.id;
          this.isLoadingAction = true;
          this.productService.deleteProduct(product.id).subscribe(data => {
              this.isDeletingAction = false;
              this.setPage(1, () => this.toaster.success('product Deleted Successfully'));
              this.toaster.success('product Deleted Successfully');
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

  deactivateProduct(productId) {
    this.actionId = productId;
    this.isLoadingAction = true;
    this.productService.deactivateProduct(productId).subscribe(data => {
          this.isLoadingAction = false;
          this.actionId = null;
          console.log(data);
          this.products.filter(product => product.id === productId)[0].isEnabled = 0;
          this.toaster.success('Product Deactivated Successfully');
        },
        err => {
          this.isLoadingAction = false;
          this.actionId = null;
          this.toaster.error(err.error.message, 'Error');
        });
  }

  activateProduct(productId) {
    this.actionId = productId;
    this.isLoadingAction = true;
    this.productService.activateProduct(productId).subscribe(data => {
          this.isLoadingAction = false;
          this.actionId = null;
          console.log(data);
          this.products.filter(product => product.id === productId)[0].isEnabled = 1;
          this.toaster.success('Product Activated Successfully');
        },
        err => {
          console.log(err);
          this.isLoadingAction = false;
          this.actionId = null;
          this.toaster.error(err.error.message, 'Error');
        });
  }

  addProductToSection = (productId) => {
    this.actionId = productId;
    this.isLoadingAction = true;
    this.sectionService.addProductToSection({'productId': productId}, this.sectionId).subscribe(data => {
          this.isLoadingAction = false;
          this.actionId = null;
          this.sectionUpdated.emit(true);
          console.log(data);
          this.toaster.success('Product Added Successfully');
        },
        err => {
          console.log(err);
          this.isLoadingAction = false;
          this.actionId = null;
          this.toaster.error(err.error.message, 'Error');
        });
  }

  deleteProductFromSection = (productId) => {
    this.actionId = productId;
    this.isLoadingAction = true;
    this.sectionService.removeProductFromSection({'productId': productId}, this.sectionId).subscribe(data => {
          this.isLoadingAction = false;
          this.actionId = null;
          this.sectionUpdated.emit(true);
          console.log(data);
          this.toaster.success('Product Removed Successfully');
        },
        err => {
          console.log(err);
          this.isLoadingAction = false;
          this.actionId = null;
          this.toaster.error(err.error.message, 'Error');
        });
  }

  openFilterModal(modalRef) {
    this.modalReference =  this.modalService.open(modalRef);
  }

  gotoProduct(id) {
    console.log(id);
    this.router.navigate(['/product/manage/' + id]);
  }

}
