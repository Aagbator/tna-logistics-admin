import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './views/layout/layout.component';
import { LayoutModule } from './views/layout/layout.module';
import {AppCustomPreloader} from './core/app-custom-preloader.class';
import {CategoryModule} from './views/pages/category/category.module';
import {CustomerModule} from './views/pages/customer/customer.module';
import {AuthGuard} from './core/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./views/pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'shop',
    loadChildren: () => import('./views/pages/shop/shop.module').then(m => m.ShopModule),
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'error',
    loadChildren: () => import('./views/pages/error/error.module').then(m => m.ErrorModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./views/pages/apps/dashboards/dashboard1/dashboard1.module').then(m => m.Dashboard1Module),
    component: LayoutComponent,
    data: { preload: true, delay: 1000 },
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./views/pages/admin/admin.module').then(m => m.AdminModule),
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer',
    loadChildren: () => import('./views/pages/customer/customer.module').then(m => m.CustomerModule),
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bank-payments',
    loadChildren: () => import('./views/pages/bank-payments/bank-payments.module').then(m => m.BankPaymentsModule),
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'product',
    loadChildren: () => import('./views/pages/product/product.module').then(m => m.ProductModule),
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./views/pages/my-account/my-account.module').then(m => m.MyAccountModule),
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'role',
    loadChildren: () => import('./views/pages/role/role.module').then(m => m.RoleModule),
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category',
    loadChildren: () => import('./views/pages/category/category.module').then(m => m.CategoryModule),
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'coupon',
    loadChildren: () => import('./views/pages/coupon/coupon.module').then(m => m.CouponModule),
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'configuration',
    loadChildren: () => import('./views/pages/configuration/configuration.module').then(m => m.ConfigurationModule),
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./views/pages/order/order.module').then(m => m.OrderModule),
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payout',
    loadChildren: () => import('./views/pages/payout/payout.module').then(m => m.PayoutModule),
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'portal',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path        : 'apps',
        loadChildren: () => import('./views/pages/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path        : 'ui',
        loadChildren: () => import('./views/pages/extra/ui/ui.module').then(m => m.UIModule)
      },
      {
        path        : 'charts',
        loadChildren: () => import('./views/pages/extra/charts/charts.module').then(m => m.ThemeChartsModule)
      },
      {
        path        : 'google-maps',
        loadChildren: () => import('./views/pages/extra/google-maps/google-maps.module').then(m => m.GoogleMapsDemoModule)
      },
      {
        path        : 'ngbootstrap',
        loadChildren: () => import('./views/pages/extra/ngbootstrap/ngbootstrap.module').then(m => m.NgbootstrapModule)
      },
      {
        path        : 'angular-material',
        loadChildren: () => import('./views/pages/angular-material/angular-material.module').then(m => m.AngularMaterialModule)
      },
      {
        path        : 'pages',
        loadChildren: () => import('./views/pages/extra/pages/pages.module').then(m => m.PagesModule)
      },
    ],
    canActivate: [AuthGuard]
  },

  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path      : '**',
    redirectTo: '/login',
  }
];

@NgModule({
  imports: [
    CommonModule,
    CategoryModule,
    CustomerModule,
    RouterModule.forRoot(routes, {useHash: false, preloadingStrategy: AppCustomPreloader}),
    LayoutModule,
  ],
  providers: [
    AppCustomPreloader
  ],
  declarations: [],
  exports: [],
})
export class AppRoutingModule { }
