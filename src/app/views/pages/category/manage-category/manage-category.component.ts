import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CategoryService} from '../../../../core/services/category/category.service';
import {Category} from '../../../../core/models/category/category.model';
import swal from 'sweetalert2';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Product} from '../../../../core/models/product/product.model';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss', '../../../../core/custom-table.scss']
})

export class ManageCategoryComponent implements OnInit {

  public itemsPerView = 5;
  page: number;
  categories = new Array<Category>();
  category: Category;
  pageSize: number;
  totalRecords: number;
  public categoryModal: NgbModalRef;
  public imageModalReference: NgbModalRef;
  state = {isLoading: false, isLoaded: false};
  isLoadingAction: boolean;
  public isEditingCategory: boolean;
  public activeCategory: Category;

  selectedFile: File = null;
  uploadedPercentage = 0;
  fileUploading = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  selectedCategory: Category;

  public categoryObj = {
    'name': null,
    'slug': null,
    'description': null
  };


  @ViewChild(ManageCategoryComponent) table: ManageCategoryComponent;
  actionId: any;
  isDeletingAction = false;
  public isCreatingCategory = false;

  constructor(private categoryService: CategoryService, private router: Router, private modalService: NgbModal,
              private toaster: ToastrService, private route: ActivatedRoute) {
    this.totalRecords = 0;
    this.pageSize = 20;
    this.page = 1;
  }

  ngOnInit() {
    const res = this.route.snapshot.data['categories'];
    console.log('rows', res);
    this.page = res.page;
    this.totalRecords = res.totalRecords;
    this.categories = res.map(cat => new Category(cat));
  }

  setPage() {
    this.state.isLoading = true;
    // this.page = p.page;
    this.categoryService.getCategories().subscribe((res: any) => {
      this.state.isLoaded = true;
      this.state.isLoading = false;
      console.log(res);
      this.page = res.page;
      this.totalRecords = res.totalRecords;
      this.categories = res.map(cat => new Category(cat));
    });
  }

  deactivateCategory(categoryId) {
    this.actionId = categoryId;
    this.isLoadingAction = true;
    this.categoryService.deactivateCategory(categoryId).subscribe(data => {
          this.isLoadingAction = false;
          this.actionId = null;
          console.log(data);
          this.categories.filter(product => product.id === categoryId)[0].status = false;
          this.toaster.success('Category Deactivated Successfully');
        },
        err => {
          this.isLoadingAction = false;
          this.actionId = null;
          this.toaster.error(err.error.message, 'Error');
        });
  }

  activateCategory(categoryId) {
    this.actionId = categoryId;
    this.isLoadingAction = true;
    this.categoryService.activateCategory(categoryId).subscribe(data => {
          this.isLoadingAction = false;
          this.actionId = null;
          console.log(data);
          this.categories.filter(product => product.id === categoryId)[0].status = true;
          this.toaster.success('Category Activated Successfully');
        },
        err => {
          console.log(err);
          this.isLoadingAction = false;
          this.actionId = null;
          this.toaster.error(err.error.message, 'Error');
        });
  }

  deleteCategory(category) {
    (swal as any).fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete ' + category.name + ' Category',
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
            this.actionId = category.id;
            this.isDeletingAction = true;
            this.categoryService.deleteCategory(category.id).subscribe(data => {
                this.isDeletingAction = false;
                this.setPage();
                this.toaster.success('Category Deleted Successfully');
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

  openCategoryModal(content, category: Category) {
    this.isEditingCategory = false;
    this.categoryObj.name = '';
    this.categoryObj.description = '';
    this.categoryObj.slug = '';
    this.activeCategory = null;
    if (category) {
      this.categoryObj.name = category.name;
      this.categoryObj.description = category.description;
      this.categoryObj.slug = category.slug;
      this.activeCategory = category;
      this.isEditingCategory = true;
    }

    this.categoryModal = this.modalService.open(content, { size: 'lg', centered: true  });

    this.categoryModal.result.then(
        result => {
          // console.log(result);
        },
        reason => {

        }
    );
  }

  createCategory(): void {
    this.isCreatingCategory = true;
    this.categoryService.createCategory(this.categoryObj).subscribe((res: any) => {
      this.toaster.success('', 'Created Successfully');
      this.isCreatingCategory = false;
      this.categoryObj.name = null;
      this.categoryObj.description = null;
      this.setPage();
      this.categoryModal.close();
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingCategory = false;
    });
  }

  updateCategory(): void {
    this.isCreatingCategory = true;
    this.categoryService.updateCategory(this.categoryObj, this.activeCategory.id).subscribe((res: any) => {
      this.toaster.success('', 'Updated Successfully');
      this.isCreatingCategory = false;
      this.categoryObj.name = null;
      this.categoryObj.description = null;
      this.categoryModal.close();
      this.setPage();
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingCategory = false;
    });
  }


  onFileSelected(event) {
    // this.selectedFile = < File > event.target.files[0];
    this.imageChangedEvent = event;
  }

  onUpload() {
    const fd = new FormData();
    this.fileUploading = true;
    this.uploadedPercentage = 0;
    fd.append('multipartFile', this.selectedFile, this.selectedFile.name);

    this.categoryService.uploadCategoryImage(fd, this.activeCategory.id).subscribe((event: HttpEvent < any >, res: any ) => {
      switch (event.type) {
        case HttpEventType.Sent:
          break;
        case HttpEventType.Response:
          this.imageModalReference.close();
          this.toaster.success('', 'Image Uploaded Successfully');
          this.selectedFile = null;
          this.actionId = null;
          this.setPage();
          // this.ngOnInit();
          this.fileUploading = false;
          this.selectedFile = null;
          this.uploadedPercentage = 0;
          break;
        case 1:
        {
          if (Math.round(this.uploadedPercentage) !== Math.round(event['loaded'] / event['total'] * 100)) {
            this.uploadedPercentage = Math.round(event['loaded'] / event['total'] * 100);
          }
          break;
        }
      }
    }, error => {
      this.toaster.error('', 'Something went wrong');
    });
  }

  openImageModal(modalRef, category: Category) {
    if (category) {
      this.activeCategory = category;
    }
    this.imageModalReference =  this.modalService.open(modalRef);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.file;
    this.selectedFile = new File([this.croppedImage], 'profile-picture');
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

}
