import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../../../core/models/order/order.model';
import {Product} from '../../../../core/models/product/product.model';
import {OrderService} from '../../../../core/services/order/order.service';
import {ToastrService} from 'ngx-toastr';
import {Utils} from '../../../../core/helpers/utils';
import swal from 'sweetalert2';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  public order: Order;
  public orderId: number;
  public isUpdatingStatus: boolean;
  public deliveryStatus: string;

  constructor(private router: Router, private route: ActivatedRoute, private activatedRoute: ActivatedRoute,
  private orderService: OrderService, private toaster: ToastrService) {
    this.activatedRoute.params.subscribe(params => {
      this.orderId = +params['id'];
    });
  }

  ngOnInit() {

    const data = this.route.snapshot.data['order'];
    this.getOrder(data);
  }

  getOrder = (data) => {
    const order = new Order(data) ;
    order.productOrderItems.forEach(item => {
      const itemProduct = item.product;
      item.product = new Product(itemProduct);
    });
    this.order = order;
  }

  updateOrder(isCancelled = false) {
    if(!isCancelled) {
      const currentStatus = this.order.deliveryStatus;
      switch (currentStatus) {
        case Utils.deliveryStatus.AWAITING:
          this.deliveryStatus = Utils.deliveryStatus.TRANSIT;
          break;
        case Utils.deliveryStatus.TRANSIT:
          this.deliveryStatus = Utils.deliveryStatus.DELIVERED;
          break;
      }
    }
    else {
      this.deliveryStatus = Utils.deliveryStatus.CANCELLED;
    }

    (swal as any).fire({
      title: 'Are you sure?',
      text: 'Do you want to update delivery status to ' + this.deliveryStatus,
      type: 'info',
      confirmButtonColor: '#5aab59',
      cancelButtonColor: '#cccccc',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showConfirmButton: true,
      showCancelButton: true
    })
        .then((willUpdate) => {
          if (willUpdate.value) {
            this.isUpdatingStatus = true;
            this.orderService.updateOrderStatus(this.deliveryStatus, this.orderId).subscribe((res: any) => {
              this.toaster.success('', 'Delivery Status Updated');
              this.isUpdatingStatus = false;
              this.getOrder(res.data);
            }, err => {
              this.toaster.error(err.error.message, 'Error');
              this.isUpdatingStatus = false;
            });
          }
          this.isUpdatingStatus = false;
        });
  }

  cancelOrder(){

  }
}
