import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ProductService} from '../../../../../core/services/product/product.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../../../core/models/product/product.model';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ProductImage} from '../../../../../core/models/product/product-image.model';

@Component({
  selector: 'app-manage-key-feature',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss', '../../../../../core/custom-table.scss']
})

export class ProductImagesComponent implements OnInit {
  public itemsPerView = 5;
  page: number;
  productImages = new Array<ProductImage>();
  pageSize: number;
  product: Product;
  productId: number;
  totalRecords: number;
  state = {isLoading: false, isLoaded: false};
  isLoadingAction: boolean;

  modalReference: NgbModalRef;
  selectedFile: File = null;
  uploadedPercentage = 0;
  fileUploading = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  @ViewChild(ProductImagesComponent) table: ProductImagesComponent;
  actionId: any;
  isDeletingAction = false;

  constructor(private productService: ProductService, private router: Router, private modalService: NgbModal,
              private toaster: ToastrService, private activatedRoute: ActivatedRoute) {
    this.totalRecords = 0;
    this.pageSize = 20;
    this.page = 1;
  }

  ngOnInit() {

    this.activatedRoute.parent.data.subscribe((data: any) => {
      this.productImages = new Product(data.product).images.map(ele => new ProductImage(ele));
      this.productId = +data.product.id;
    });
  }

  deleteProductImage(imageId) {
    this.actionId = imageId;
    this.isLoadingAction = true;
    this.productService.deleteOtherImages(imageId).subscribe(data => {
          this.isLoadingAction = false;
          this.actionId = null;
          this.productImages = this.productImages.filter(image => image.id !== imageId);
          this.toaster.success('Image Deleted Successfully');
        },
        err => {
          this.isLoadingAction = false;
          this.actionId = null;
          this.toaster.error(err.error.message, 'Error');
        });
  }

  onFileSelected(event) {
    this.imageChangedEvent = event;
  }

  onUpload() {
    const fd = new FormData();
    this.fileUploading = true;
    this.uploadedPercentage = 0;
    fd.append('image', this.selectedFile, this.selectedFile.name);

    this.productService.uploadOtherProductImage(fd, this.productId).subscribe((event: HttpEvent < any >, res: any ) => {
      switch (event.type) {
        case HttpEventType.Sent:
          break;
        case HttpEventType.Response:
          this.toaster.success('', 'Image Uploaded Successfully');
          this.modalReference.close();
          this.selectedFile = null;
          this.reloadProduct();
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

  openImageModal(modalRef) {
    this.modalReference =  this.modalService.open(modalRef);
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

  reloadProduct() {
    this.productService.getProductById(this.productId).subscribe((data) => {
      this.productImages = new Product(data).images.map(ele => new ProductImage(ele));
    });
  }

}
