import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

import { HeaderModule } from './components/header/header.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { FooterModule } from './components/footer/footer.module';
import { SubheaderModule } from './components/subheader/subheader.module';
import { QuickSidebarModule } from './components/quick-sidebar/quick-sidebar.module';

@NgModule({
    imports: [
	    RouterModule,
	    HeaderModule,
	    FooterModule,
	    SidebarModule,
	    QuickSidebarModule,
	    SubheaderModule,
    ],
    declarations: [
	    LayoutComponent,
    ]
})
export class LayoutModule
{
}
