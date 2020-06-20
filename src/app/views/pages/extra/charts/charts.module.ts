import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'src/app/core/components/card/card.module';
import { SubheaderModule } from 'src/app/views/layout/components/subheader/subheader.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';

import { ChartjsComponent } from './chartjs/chartjs.component';
import { NgxChartsComponent } from './ngx-charts/ngx-charts.component';

const routes: Routes = [
    {
        path       : 'chartjs',
        component  : ChartjsComponent,
    },
    {
        path       : 'ngx-charts',
        component  : NgxChartsComponent,
    },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardModule,
    SubheaderModule,
    NgxChartsModule,
    ChartsModule,
  ],
  declarations: [ChartjsComponent, NgxChartsComponent]
})
export class ThemeChartsModule { }
