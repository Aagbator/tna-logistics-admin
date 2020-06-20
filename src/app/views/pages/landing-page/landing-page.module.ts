import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {CardModule} from '../../../core/components/card/card.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LandingPageRoutes} from './landing-page-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LandingPageRoutes),
    CardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [

  HomeComponent]
})
export class LandingPageModule {}
