import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert2';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {UtilityService} from '../../../../core/services/utility.service';
import {Order} from '../../../../core/models/order/order.model';
import {OrderService} from '../../../../core/services/order/order.service';
import {Utils} from '../../../../core/helpers/utils';

@Component({
  selector: 'app-manage-event-log',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss', '../../../../core/custom-table.scss']
})

export class ManageOrderComponent implements OnInit {

  public itemsPerView = 10;
  filterText: string;
  private totalPages: number;
  public searchTerm = new Subject<string>();
  private searchText: string;

  deliveryStatus = Utils.deliveryStatus;
  transactionStatus = Utils.transactionStatus;

  status: number;
  page: number;
  pageSize: number;
  totalRecords: number;
  actionId: any;
  isFiltering = false;

  public orders: Order[];
  public types: string[];
  public isLoadingOrders: boolean;

  public filterObj: any = {
    'searchQuery': '',
    'transactionStatus': 'ALL',
    'deliveryStatus': 'ALL'
  };

  modalReference: NgbModalRef;
  productId: number;

  constructor(private orderService: OrderService, private router: Router, private modalService: NgbModal,
              private toaster: ToastrService, private route: ActivatedRoute, private utilService: UtilityService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.productId = +params['id'];
    });
    this.pageSize = 20;
    this.page = 1;
    this.status = 2;
    this.types = [];
  }

  onFilter() {
    this.isFiltering = true;
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
    const res = this.route.snapshot.data['orders'];
    this.setPage(1, () => {});

    this.getOrders();
    // this.getEventTypes();

    this.searchTerm
      .pipe(debounceTime(500))
      .subscribe(search => {
        this.searchText = search;
        this.getPaginatedData(1);
    });
  }

  filterData = (value: string) => {
    this.searchTerm.next(value.trim());
  }

  getOrders(): void {
    this.isLoadingOrders = true;
    this.orderService.getOrder(1, 10, this.searchText, this.filterObj.transactionStatus, this.filterObj.deliveryStatus).subscribe((res: any) => {
      this.isLoadingOrders = false;
      this.orders = res.content.map(order => new Order(order));
      console.log(this.orders);
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isLoadingOrders = false;
    });
  }

  setPage(p, callback) {
    this.page = p;
    this.orderService.getOrder(this.page, this.itemsPerView, this.searchText, this.filterObj.transactionStatus, this.filterObj.deliveryStatus).subscribe((res: any) => {
      if(callback) {
        callback();
      }
      this.page = res.page;
      this.totalRecords = res.totalRecords;
      this.orders = res.content.map(eventLog => new Order(eventLog));
    });
  }


  getPaginatedData = (page: number) => {
    this.setPage(page, () => {});
  }

  openFilterModal(modalRef) {
    this.modalReference =  this.modalService.open(modalRef);
  }

  gotoOrder(id) {
    this.router.navigate(['/orders/' + id]);
  }
}
