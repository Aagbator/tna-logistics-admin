import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule} from '../../../core/shared.module';
import { ManageSectionComponent } from './manage-section/manage-section.component';
import { SectionResolver } from './section.resolver';
import {ManageBannerComponent} from './manage-banner/manage-banner.component';
import {BannerResolver} from './banner.resolver';

const routes = [
    {
        path       : 'section',
        component  : ManageSectionComponent,
        resolve: { sections: SectionResolver }
    },
    {
        path       : 'banner',
        component  : ManageBannerComponent,
        resolve: { banners: BannerResolver }
    }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ManageSectionComponent, ManageBannerComponent],
  providers: [SectionResolver, BannerResolver]
})
export class ShopModule { }
