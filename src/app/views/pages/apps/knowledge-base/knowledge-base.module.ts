import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'src/app/core/components/card/card.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { KnowledgeBaseComponent } from './knowledge-base.component';
import { KnowledgeBaseService } from './knowledge-base.service';

const routes: Routes = [
    {
        path: '**',
        component: KnowledgeBaseComponent,
        resolve: {
            data: KnowledgeBaseService
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CardModule,
        PerfectScrollbarModule,
        FlexLayoutModule,
        
        MatButtonModule, 
        MatIconModule, 
        MatSidenavModule,
    ],
    declarations: [KnowledgeBaseComponent],
    providers   : [
        KnowledgeBaseService
    ],
})
export class KnowledgeBaseModule { }
