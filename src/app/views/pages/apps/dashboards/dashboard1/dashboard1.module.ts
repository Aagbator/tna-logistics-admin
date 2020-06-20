import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CardModule } from 'src/app/core/components/card/card.module';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SubheaderModule } from 'src/app/views/layout/components/subheader/subheader.module';

import { Dashboard1Component } from './dashboard1.component';
import {SharedModule} from '../../../../../core/shared.module';

const routes: Routes = [
    {
        path     : '',
        component: Dashboard1Component,
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    SubheaderModule,
    CardModule,
    ChartsModule,
    NgxChartsModule,
  ],
  declarations: [Dashboard1Component]
})
export class Dashboard1Module { }
