import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'src/app/core/components/card/card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubheaderModule } from 'src/app/views/layout/components/subheader/subheader.module';

import { AngularMaterialComponent } from './angular-material.component';

const routes = [
	{
		path: '',
		component: AngularMaterialComponent
	},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubheaderModule,
  ],
  declarations: [AngularMaterialComponent]
})
export class AngularMaterialModule { }
