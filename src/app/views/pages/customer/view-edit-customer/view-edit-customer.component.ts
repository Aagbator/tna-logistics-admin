import { Component, OnInit } from '@angular/core';
import {UtilityService} from '../../../../core/services/utility.service';
import {UserService} from '../../../../core/services/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpEvent, HttpEventType} from '@angular/common/http';

import {ToastrService} from 'ngx-toastr';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {User} from '../../../../core/models/user/user.model';
import {Customer} from '../../../../core/models/user/customer.model';


@Component({
  selector: 'app-view-edit-customer',
  templateUrl: './view-edit-customer.component.html',
  styleUrls: ['./view-edit-customer.component.css']
})
export class ViewEditCustomerComponent implements OnInit {

  public loggedInUser = UtilityService.UserProfile ? new User(UtilityService.UserProfile) : new User('');
  public customer: Customer;
  public customerId: number;


  constructor(private router: Router, private route: ActivatedRoute, private activatedRoute: ActivatedRoute,
              private modalService: NgbModal, private userService: UserService, private toaster: ToastrService) {
    this.activatedRoute.params.subscribe(params => {
      this.customerId = +params['id'];
    });
  }

  ngOnInit() {
    console.log(this.route.snapshot.data['customer']);
    this.customer = new Customer(this.route.snapshot.data['customer'].data) ;
  }

  reloadCustomer(){
    this.userService.getUserById(this.customerId).subscribe((res) => {
      console.log(new Customer(res));
      this.customer = new Customer(res);
    });
  }

}
