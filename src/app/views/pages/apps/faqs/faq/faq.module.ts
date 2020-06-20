import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SubheaderModule } from 'src/app/views/layout/components/subheader/subheader.module';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FaqComponent } from './faq.component';
import { NewFaqComponent } from './dialogs/new-faq/new-faq.component';
import { FaqService } from './faq.service';

const routes: Routes = [
    {
        path: '**',
        component: FaqComponent,
        resolve  : {
            faq: FaqService
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        PipesModule,
        FlexLayoutModule,
        SubheaderModule,
        NgbModule,

        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatSidenavModule,
    ],
    declarations: [FaqComponent, NewFaqComponent],
    providers   : [
        FaqService
    ],
    entryComponents: [
        NewFaqComponent
    ]
})
export class FaqModule { }
