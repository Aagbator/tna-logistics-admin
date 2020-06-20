import { Component, OnInit } from '@angular/core';
import {UtilityService} from '../../../../core/services/utility.service';
import {User} from '../../../../core/models/user/user.model';
import {Product} from '../../../../core/models/product/product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {ProductService} from '../../../../core/services/product/product.service';
import {ToastrService} from 'ngx-toastr';
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-view-edit-product',
  templateUrl: './view-edit-product.component.html',
  styleUrls: ['./view-edit-product.component.css']
})
export class ViewEditProductComponent implements OnInit {

  public loggedInUser = UtilityService.UserProfile ? new User(UtilityService.UserProfile) : new User('');
  public product: Product;
  public productId: number;
  hovered = 0;
  modalReference: NgbModalRef;
  selectedFile: File = null;
  uploadedPercentage = 0;
  fileUploading = false;
  fileType = null;
  imageChangedEvent: any = '';
  croppedImage: any = '';


  constructor(private router: Router, private route: ActivatedRoute, private activatedRoute: ActivatedRoute,
              private modalService: NgbModal, private productService: ProductService, private toaster: ToastrService) {
    this.activatedRoute.params.subscribe(params => {
      this.productId = +params['id'];
    });
  }

  ngOnInit() {
    console.log(this.route.snapshot.data['product']);
    this.product = new Product(this.route.snapshot.data['product']) ;
  }

  onFileSelected(event) {
   // this.selectedFile = < File > event.target.files[0];
    this.imageChangedEvent = event;
  }

  onUpload() {
    const fd = new FormData();
    this.fileUploading = true;
    this.uploadedPercentage = 0;
    fd.append('image', this.selectedFile, this.selectedFile.name);

    this.productService.uploadProductProfileImage(fd, this.product.id).subscribe((event: HttpEvent < any >, res: any ) => {
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

  reloadProduct(){
    this.productService.getProductById(this.productId).subscribe((res) => {
      console.log(new Product(res));
      this.product = new Product(res);
    });
  }

}
