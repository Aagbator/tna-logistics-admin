import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardModule} from './components/card/card.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import { ToastrModule } from 'ngx-toastr';
import {SubheaderModule} from '../views/layout/components/subheader/subheader.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CustomMinValidatorDirective } from './directives/custom-min-validator.directive';
import { CustomMaxValidatorDirective } from './directives/custom-max-validator.directive';
import {PipesModule} from './pipes/pipes.module';
import {QuillModule} from 'ngx-quill';
import {ManageProductComponent} from '../views/pages/product/manage-product/manage-product.component';
import {ProductModule} from '../views/pages/product/product.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    LoadingBarModule,
    NgxPaginationModule,
    ImageCropperModule,
    SubheaderModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  declarations: [
  ManageProductComponent,
  CustomMinValidatorDirective,
  CustomMaxValidatorDirective],
  exports: [
    ManageProductComponent,
    LoadingBarModule,
    FormsModule,
    PipesModule,
    CardModule,
    NgxPaginationModule,
    ImageCropperModule,
    ReactiveFormsModule,
    SubheaderModule,
    ToastrModule,
    QuillModule,
    NgbModule,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule { }
