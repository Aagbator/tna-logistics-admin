import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BannerService} from '../../../../core/services/banner/banner.service';
import {Banner} from '../../../../core/models/banner/banner.model';
import swal from 'sweetalert2';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-manage-banner',
  templateUrl: './manage-banner.component.html',
  styleUrls: ['./manage-banner.component.scss', '../../../../core/custom-table.scss']
})

export class ManageBannerComponent implements OnInit {

  public itemsPerView = 5;
  page: number;
  banners = new Array<Banner>();
  banner: Banner;
  pageSize: number;
  totalRecords: number;
  public bannerModal: NgbModalRef;
  public imageModalReference: NgbModalRef;
  state = {isLoading: false, isLoaded: false};
  isLoadingAction: boolean;
  public isEditingBanner: boolean;
  public activeBanner: Banner;

  selectedFile: File = null;
  uploadedPercentage = 0;
  fileUploading = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  public bannerObj = {
    'description': '',
    'orderIndex': 0,
    'title': null,
    'url': null
  };

  @ViewChild(ManageBannerComponent) table: ManageBannerComponent;
  actionId: any;
  isDeletingAction = false;
  public isCreatingBanner = false;

  constructor(private bannerService: BannerService, private router: Router, private modalService: NgbModal,
              private toaster: ToastrService, private route: ActivatedRoute) {
    this.totalRecords = 0;
    this.pageSize = 20;
    this.page = 1;
  }

  ngOnInit() {
    const res = this.route.snapshot.data['banners'];
    this.page = res.page;
    this.totalRecords = res.totalRecords;
    this.banners = res.map(banner => new Banner(banner));
  }

  setPage() {
    this.state.isLoading = true;
    // this.page = p.page;
    this.bannerService.getBanners().subscribe((res: any) => {
      this.state.isLoaded = true;
      this.state.isLoading = false;
      console.log(res);
      this.page = res.page;
      this.totalRecords = res.totalRecords;
      this.banners = res.map(banner => new Banner(banner));
    });
  }

  deactivateBanner(bannerId) {
    this.actionId = bannerId;
    this.isLoadingAction = true;
    this.bannerService.deactivateBanner(bannerId).subscribe(data => {
          this.isLoadingAction = false;
          this.actionId = null;
          console.log(data);
          this.banners.filter(product => product.id === bannerId)[0].isActive = false;
          this.toaster.success('Banner Deactivated Successfully');
        },
        err => {
          this.isLoadingAction = false;
          this.actionId = null;
          this.toaster.error(err.error.message, 'Error');
        });
  }

  activateBanner(bannerId) {
    this.actionId = bannerId;
    this.isLoadingAction = true;
    this.bannerService.activateBanner(bannerId).subscribe(data => {
          this.isLoadingAction = false;
          this.actionId = null;
          console.log(data);
          this.banners.filter(product => product.id === bannerId)[0].isActive = true;
          this.toaster.success('Banner Activated Successfully');
        },
        err => {
          console.log(err);
          this.isLoadingAction = false;
          this.actionId = null;
          this.toaster.error(err.error.message, 'Error');
        });
  }

  deleteBanner(banner) {
    (swal as any).fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete ' + banner.name + ' Banner',
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
            this.actionId = banner.id;
            this.isDeletingAction = true;
            this.bannerService.deleteBanner(banner.id).subscribe(data => {
                this.isDeletingAction = false;
                this.setPage();
                this.toaster.success('Banner Deleted Successfully');
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

  openBannerModal(content, banner: Banner) {
    console.log(banner);
    this.isEditingBanner = false;
    this.bannerObj.title = null;
    // this.bannerObj.description = null;
    this.bannerObj.orderIndex = 0;
    this.bannerObj.url = null;
    this.activeBanner = null;
    if (banner) {
      this.bannerObj.title = banner.title;
      this.bannerObj.description = banner.description;
      this.bannerObj.orderIndex = banner.orderIndex;
      this.bannerObj.url = banner.url;
      this.activeBanner = banner;
      this.isEditingBanner = true;
    }

    this.bannerModal = this.modalService.open(content, { size: 'lg', centered: true  });

    this.bannerModal.result.then(
        result => {
          // console.log(result);
        },
        reason => {

        }
    );
  }

  createBanner(): void {
    this.isCreatingBanner = true;
    this.bannerService.createBanner(this.bannerObj).subscribe((res: any) => {
      this.toaster.success('', 'Created Successfully');
      this.isCreatingBanner = false;
      this.bannerObj.title = null;
      this.bannerObj.description = null;
      this.bannerObj.orderIndex = 0;
      this.bannerObj.url = null;
      this.setPage();
      this.bannerModal.close();
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingBanner = false;
    });
  }

  updateBanner(): void {
    this.isCreatingBanner = true;
    this.bannerService.updateBanner(this.bannerObj, this.activeBanner.id).subscribe((res: any) => {
      this.toaster.success('', 'Updated Successfully');
      this.isCreatingBanner = false;
      this.bannerObj.title = null;
      // this.bannerObj.description = null;
      this.bannerObj.orderIndex = 0;
      this.bannerObj.url = null;
      this.bannerModal.close();
      this.setPage();
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingBanner = false;
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
    fd.append('bannerImage', this.selectedFile, this.selectedFile.name);

    this.bannerService.uploadBannerImage(fd, this.activeBanner.id).subscribe((event: HttpEvent < any >, res: any ) => {
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

  openImageModal(modalRef, banner: Banner) {
    if (banner) {
      this.activeBanner = banner;
    }
    this.imageModalReference = this.modalService.open(modalRef, { size: 'lg', centered: true  });
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
