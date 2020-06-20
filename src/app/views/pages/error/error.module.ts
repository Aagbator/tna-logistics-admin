import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardModule} from '../../../core/components/card/card.module';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Error404Component} from './error-404/error-404.component';
import {Error500Component} from './error-500/error-500.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '404',
        component: Error404Component
      },
      {
        path: '500',
        component: Error404Component
      }
    ]),
    CardModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [Error404Component, Error500Component]
})
export class ErrorModule {
}
