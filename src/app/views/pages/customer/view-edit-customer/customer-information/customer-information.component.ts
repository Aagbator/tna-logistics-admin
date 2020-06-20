import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from '../../../../../core/models/user/customer.model';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css']
})
export class CustomerInformationComponent implements OnInit {

  public customer: Customer;
  public customerId: number;


  constructor(private router: Router, private route: ActivatedRoute, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.customerId = +params['id'];
    });
  }

  ngOnInit() {
    this.route.parent.data.subscribe((data: any) => {
      this.customer = new Customer(data.customer.data) ;
    });
  }

}
