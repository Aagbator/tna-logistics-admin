import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert2';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Product} from '../../../../core/models/product/product.model';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {LGA} from '../../../../core/models/lga.model';
import {UtilityService} from '../../../../core/services/utility.service';
import {DeliveryService} from '../../../../core/services/delivery/delivery.service';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-manage-lga',
  templateUrl: './delivery-cost.component.html',
  styleUrls: ['./delivery-cost.component.scss', '../../../../core/custom-table.scss']
})

export class DeliveryCostComponent implements OnInit {

  public itemsPerView = 10;
  page: number;
  lgas = new Array<LGA>();
  filteredLGA = new Array<LGA>();
  pageSize: number;
  totalRecords: number;
  public lgaModal: NgbModalRef;
  state = {isLoading: false, isLoaded: false};
  isLoadingAction: boolean;
  public isEditingLGA: boolean;
  public activeLGA: LGA;

  public costOfDelivery: number;

  filterText: string;
  public searchTerm = new Subject<string>();
  private searchText: string;


  @ViewChild(DeliveryCostComponent) table: DeliveryCostComponent;
  actionId: any;
  public isUpdatingLGA = false;

  constructor(private utilService: UtilityService, private router: Router, private modalService: NgbModal,
              private toaster: ToastrService, private route: ActivatedRoute, private deliveryService: DeliveryService) {
    this.totalRecords = 0;
    this.pageSize = 20;
    this.page = 1;
  }

  ngOnInit() {
    const res = this.route.snapshot.data['lgas'];
    const data = res.data.map(lga => new LGA(lga));
    this.lgas = data.sort((a, b) => a.name.localeCompare(b.name));
    this.filteredLGA = this.lgas;

    this.searchTerm
        .pipe(debounceTime(100))
        .subscribe(search => {
          this.searchText = search;

          const lgaList = this.lgas;
          const result = lgaList.filter(lga => lga.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
          this.filteredLGA = result;

          this.lgas.filter(lga => lga.name.includes(this.searchText));
        });
  }

  filterData = (value: string) => {
    this.searchTerm.next(value.trim());
  }

  setPage() {
    this.state.isLoading = true;
    // this.page = p.page;
    this.utilService.getLGA().subscribe((res: any) => {
      this.state.isLoaded = true;
      this.state.isLoading = false;
      const data = res.data.map(lga => new LGA(lga));
      this.lgas = data.sort((a, b) => a.name.localeCompare(b.name));
      this.filteredLGA = this.lgas;

      console.log('this.lgas', this.lgas);
      console.log('this.filteredLGA', this.filteredLGA);
    });
  }

  openLGAModal(content, lga: LGA) {
    this.isEditingLGA = false;
    if (lga) {
      console.log(lga);
      // this.lgaObj.expireDate = lga.expireDate.split('T')[0];
     this.costOfDelivery = lga.costOfDelivery;
      this.activeLGA = lga;
      this.isEditingLGA = true;
    }

    this.lgaModal = this.modalService.open(content, { size: 'sm', centered: true  });

    this.lgaModal.result.then(
        result => {
          // console.log(result);
        },
        reason => {

        }
    );
  }

  updateLGA(): void {
    this.isUpdatingLGA = true;
    this.deliveryService.updateDeliveryCost(this.activeLGA.id, this.costOfDelivery).subscribe((res: any) => {
      this.toaster.success('', 'Updated Successfully');
      this.isUpdatingLGA = false;
      this.lgaModal.close();
      this.setPage();
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isUpdatingLGA = false;
    });
  }

}
