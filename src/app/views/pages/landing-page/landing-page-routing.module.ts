import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
// import {LoginComponent} from './login/login.component';

export const LandingPageRoutes: Routes = [
  {
    path       : '',
    component  : HomeComponent,
  }
  // {
  //   path: '',
  //   children: [
  //     {
  //       path       : 'login-x',
  //       component  : LoginComponent,
  //     }
  //   ]
  // }
];

