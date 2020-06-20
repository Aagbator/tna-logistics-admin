import {SharedModule} from '../../../core/shared.module';
import {ProductResolver} from './product.resolver';
import {ProductIdResolver} from './productId.resolver';
import {ManageProductComponent} from './manage-product/manage-product.component';
import {CreateProductComponent} from './create-product/create-product.component';
import {ProductInformationComponent} from './view-edit-product/product-information/product-information.component';
import {ViewEditProductComponent} from './view-edit-product/view-edit-product.component';
import {ProductTagsComponent} from './view-edit-product/product-tags/product-tags.component';
import {ProductFeaturesComponent} from './view-edit-product/product-features/product-features.component';
import {ProductSpecificationsComponent} from './view-edit-product/product-specifications/product-specifications.component';
import {ProductImagesComponent} from './view-edit-product/product-images/product-images.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {QuillModule} from 'ngx-quill';
import {NgModule} from '@angular/core';
import {CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule} from 'ng2-currency-mask';

const routes: any = [
    {
        path: 'create',
        component: CreateProductComponent,
    },
    {
        path: 'manage',
        component: ManageProductComponent,
        resolve: {products: ProductResolver}
    },
    {
        path: 'manage/:id',
        component: ViewEditProductComponent, //
        resolve: {product: ProductIdResolver},
        children: [
            // {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {
                path: '',
                component: ProductInformationComponent,
            },
            {
                path: 'tags',
                component: ProductTagsComponent,
            },
            {
                path: 'features',
                component: ProductFeaturesComponent,
            },
            {
                path: 'specifications',
                component: ProductSpecificationsComponent,
            },
            {
              path        : 'images',
              component  : ProductImagesComponent,
            }
        ]
    },
    {
        path: 'edit/:id',
        component: CreateProductComponent,
        resolve: {product: ProductIdResolver}
    },
];

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    decimal: '.',
    precision: 2,
    prefix: '₦ ',
    suffix: '',
    thousands: ','
};


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CurrencyMaskModule,
        QuillModule,
        RouterModule.forChild(routes),
    ],
    declarations: [CreateProductComponent, ProductInformationComponent,
        ProductTagsComponent, ViewEditProductComponent,
        ProductSpecificationsComponent, ProductFeaturesComponent, ProductImagesComponent],
    providers: [ProductResolver, ProductIdResolver,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }]
})
export class ProductModule {
}
