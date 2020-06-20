import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, Router, RouterState, RouterStateSnapshot} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AuthenticationService} from '../../../../core/services/authentication.service';
import {UtilityService} from '../../../../core/services/utility.service';
import { Product } from '../../../../core/models/product/product.model';
import {ProductService} from '../../../../core/services/product/product.service';
import {Role} from '../../../../core/models/role/role.model';
import {CategoryService} from '../../../../core/services/category/category.service';
import {Category} from '../../../../core/models/category/category.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html'
})


export class CreateProductComponent implements OnInit {
  public product: Product;
  public categories: Category[];
  public formsReference: NgForm[] = [];
  public isCreatingProduct: boolean;
  public isUpdatingProduct: boolean;
  public isLoadingCategories: boolean;
  public productId;
  public description = '';
  public productName: string;
  public quillConfig;

  public productObj: any = {};

  constructor(public auth: AuthenticationService,
              private utilService: UtilityService,
              private productService: ProductService,
              private categoryService: CategoryService,
              private toaster: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private activatedRoute: ActivatedRoute
  ) {
    this.isCreatingProduct = false;
    this.isUpdatingProduct = false;
    this.categories = [];
    this.productName = '';

    this.activatedRoute.params.subscribe(params => {
      this.productId = +params['id'];
    });

    if (this.route.snapshot.data['product']) {
      this.product = new Product(this.route.snapshot.data['product']) ;
    }
  }

  ngOnInit() {
    this.quillConfig = {
      toolbar: [
        ['bold', 'italic', 'underline'],        // toggled buttons

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, false] }],                           // remove formatting button
      ]
    };

    this.getCategories();

    if (this.product) {
      console.log('>>>', this.product);
      this.product = new Product(this.route.snapshot.data['product']);
      console.log('^^', this.product);
      this.productObj.id = this.product.id;
      this.productObj.name = this.product.name;
      this.productObj.slug = this.product.slug;
      this.productObj.categoryId = this.product.category.id;
      this.productObj.price = this.product.price;
      this.productObj.isFeaturedProduct = this.product.isFeaturedProduct;
      this.productObj.hasQty = this.product.hasQty;
      this.productObj.qty = this.product.qty;
      this.productObj.hasDiscount = this.product.hasDiscount;
      this.productObj.discount = this.product.discount;
      this.productObj.hasVat = this.product.hasVat;
      this.productObj.vat = this.product.vat;
      this.description = this.product.description;
    }
  }

  onSubmitForm(): void {

    if (!this.productId) {
      if (this.description  === '') {
        this.toaster.error('', 'Product description is required');
        return;
      }
      this.productObj.description = this.description;
      console.log(this.productObj);
      this.createProduct(this.productObj);
    }

  }

  createProduct(product): void {
    this.isCreatingProduct = true;
    this.productService.createProduct(product).subscribe((res: any) => {
      this.isCreatingProduct = false;
      this.toaster.success(res.message, 'New product Created');
      this.formsReference.forEach(ref => ref.resetForm({}));
      this.isCreatingProduct = false;
      this.router.navigate(['product/manage']);
    }, err => {
      this.toaster.error(err.message, 'Error');
      this.isCreatingProduct = false;
    });
  }

  getCategories(): void {
    this.isLoadingCategories = true;
    this.categoryService.getCategories().subscribe((res: any) => {
      this.isLoadingCategories = false;
      this.categories = res.map(category => new Category(category));
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isLoadingCategories = false;
    });
  }

  updateProduct(): void {
    this.isUpdatingProduct = true;
    this.productObj.description = this.description;

    this.productService.updateProduct(this.productObj, this.productId).subscribe((res: any) => {
      this.router.navigate(['/product/manage/' + this.productId]);
      this.isUpdatingProduct = false;
      this.toaster.success('', ' Updated Successfully');
    }, err => {
      this.toaster.error(err.message, 'Error');
      this.isUpdatingProduct = false;
    });
  }
}
