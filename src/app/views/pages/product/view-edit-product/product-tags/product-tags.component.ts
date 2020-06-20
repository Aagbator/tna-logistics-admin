import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ProductService} from '../../../../../core/services/product/product.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from '../../../../../core/models/subscription/subscription.model';
import {Product} from '../../../../../core/models/product/product.model';
import {Tag} from '../../../../../core/models/product/tag.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-manage-tag',
  templateUrl: './product-tags.component.html',
  styleUrls: ['./product-tags.component.scss', '../../../../../core/custom-table.scss']
})

export class ProductTagsComponent implements OnInit {
  public itemsPerView = 5;
  page: number;
  tags = new Array<Tag>();
  tag: Tag;
  pageSize: number;
  product: Product;
  productId: number;
  totalRecords: number;
  public tagModal: NgbModalRef;
  state = {isLoading: false, isLoaded: false};
  isLoadingAction: boolean;
  public isEditingTag: boolean;
  public activeTag: Tag;

  public tagObj = {
    'productId': null,
    'tags': null

  };

  @ViewChild(ProductTagsComponent) table: ProductTagsComponent;
  actionId: any;
  isDeletingAction = false;
  public isCreatingTag = false;

  constructor(private productService: ProductService, private router: Router, private modalService: NgbModal,
              private toaster: ToastrService, private activatedRoute: ActivatedRoute) {
    this.totalRecords = 0;
    this.pageSize = 20;
    this.page = 1;
  }

  ngOnInit() {

    this.activatedRoute.parent.data.subscribe((data: any) => {
      this.tags = new Product(data.product).tags;
      this.productId = +data.product.id;
      console.log('$tags', this.tags);
      // this.customer = new Customer(data.customer.data) ;
      // data.sponsors[0].subscribe(res => {
      //   console.log(res)
      //   const { page, totalRecords, content } = res;
      //   this.page = page;
      //   this.totalRecords = totalRecords;
      //   this.subscriptions = content.map(subscription => new Subscription(subscription));
      // });
      // console.log('>>', data.subscriptions);
      // page: 1, pageSize: 10, totalRecords: 104, totalPages: 11

    });

    // // this.product = new Product(this.activatedRoute.snapshot.data['product']);
    // const res = this.activatedRoute.snapshot.data['product'];
    // console.log('$$', res);
    // this.page = res.page;
    // this.totalRecords = res.totalRecords;

    // this.tags = res.map(cat => new Tag(cat));
  }

  // setPage() {
  //   this.state.isLoading = true;
  //   // this.page = p.page;
  //   this.productService.getCategories().subscribe((res: any) => {
  //     this.state.isLoaded = true;
  //     this.state.isLoading = false;
  //     console.log(res);
  //     this.page = res.page;
  //     this.totalRecords = res.totalRecords;
  //     this.tags = res.map(cat => new Tag(cat));
  //   });
  // }

  deleteTag(tagId) {
    this.actionId = tagId;
    this.isLoadingAction = true;
    this.productService.deleteTag(this.productId, tagId).subscribe(data => {
          this.isLoadingAction = false;
          this.actionId = null;
          this.tags = this.tags.filter(tag => tag.id !== tagId);
          // this.toaster.success('Tag Deactivated Successfully');
        },
        err => {
          this.isLoadingAction = false;
          this.actionId = null;
          this.toaster.error(err.error.message, 'Error');
        });
  }

  openTagModal(content, tag: Tag) {
    this.isEditingTag = false;
    this.tagObj.tags = '';
    this.activeTag = null;

    this.tagModal = this.modalService.open(content, { size: 'sm', centered: true  });

    this.tagModal.result.then(
        result => {
          // console.log(result);
        },
        reason => {

        }
    );
  }

  createTag(f: NgForm): void {
    this.isCreatingTag = true;
    this.tagObj.productId = this.productId;
    this.tagObj.tags = f.value.name;
    this.productService.addTag(this.tagObj).subscribe((res: any) => {
      this.tags = new Product(res.data).tags;
      this.toaster.success('', 'Tag Added');
      this.isCreatingTag = false;
      f.resetForm();
      // this.setPage();
      // this.tagModal.close();
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingTag = false;
    });
  }

}
