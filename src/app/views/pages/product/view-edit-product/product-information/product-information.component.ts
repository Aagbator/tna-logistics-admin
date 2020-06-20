import { Component, OnInit } from '@angular/core';
import {UtilityService} from '../../../../../core/services/utility.service';
import {User} from '../../../../../core/models/user/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../../../core/models/product/product.model';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit {

  public product: Product;
  public productId: number;


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.productId = +params['id'];
    });
  }

  ngOnInit() {
    this.product = new Product(this.activatedRoute.snapshot.data['product']) ;
  }

}
