import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationComponent } from './navigation.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
    ],
    declarations: [NavigationComponent],
    exports: [NavigationComponent]
})
export class NavigationModule { }
