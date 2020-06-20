import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {GoogleMapsModule} from '@angular/google-maps';
import { SubheaderModule } from 'src/app/views/layout/components/subheader/subheader.module';

import { GoogleMapsComponent } from './google-maps.component';

const routes: Routes = [
    {
        path       : '**',
        component  : GoogleMapsComponent,
    },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GoogleMapsModule,
    SubheaderModule,
  ],
  declarations: [GoogleMapsComponent]
})
export class GoogleMapsDemoModule { }
