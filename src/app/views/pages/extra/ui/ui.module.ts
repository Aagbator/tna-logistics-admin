import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'src/app/core/components/card/card.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubheaderModule } from 'src/app/views/layout/components/subheader/subheader.module';

import { ListGroupComponent } from './list-group/list-group.component';
import { MediaListComponent } from './media-list/media-list.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { BadgesComponent } from './badges/badges.component';
import { InputsComponent } from './forms/inputs/inputs.component';
import { SwitchComponent } from './forms/switch/switch.component';
import { CheckboxRadioComponent } from './forms/checkbox-radio/checkbox-radio.component';
import { InputGroupComponent } from './forms/input-group/input-group.component';
import { FormLayoutComponent } from './forms/form-layout/form-layout.component';
import { TypographyComponent } from './typography/typography.component';
import { ColorsComponent } from './colors/colors.component';
import { TablesComponent } from './tables/tables.component';
import { CardsComponent } from './cards/cards/cards.component';
import { CardActionsComponent } from './cards/card-actions/card-actions.component';
import { IconsComponent } from './icons/icons.component';

const routes: Routes = [
    {
        path       : 'list-group',
        component  : ListGroupComponent,
    },
    {
        path       : 'media-list',
        component  : MediaListComponent,
    },
    {
        path       : 'buttons',
        component  : ButtonsComponent,
    },
    {
        path       : 'badges',
        component  : BadgesComponent,
    },
    {
        path       : 'tables',
        component  : TablesComponent,
    },
    {
        path       : 'material-datatables',
        loadChildren: () => import('./material-datatables/material-datatables.module').then(m => m.MaterialDatatablesModule)
    },
    {
        path       : 'ngx-dropzone',
        loadChildren: () => import('./ngx-dropzone/ngx-dropzone.module').then(m => m.NgxDropzoneModule)
    },
    {
        path       : 'forms',
        children: [
            {
                path       : 'inputs',
                component  : InputsComponent,
            },
            {
                path       : 'switch',
                component  : SwitchComponent,
            },
            {
                path       : 'checkbox-radio',
                component  : CheckboxRadioComponent,
            },
            {
                path       : 'input-group',
                component  : InputGroupComponent,
            },
            {
                path       : 'form-layout',
                component  : FormLayoutComponent,
            },
        ]
    },
    {
        path       : 'cards/cards',
        component  : CardsComponent,
    },
    {
        path       : 'cards/card-actions',
        component  : CardActionsComponent,
    },
    {
        path       : 'state-colors',
        component  : ColorsComponent,
    },
    {
        path       : 'icons',
        component  : IconsComponent,
    },
    {
        path       : 'typography',
        component  : TypographyComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CardModule,
        PerfectScrollbarModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        SubheaderModule,
    ],
    declarations: [
        ListGroupComponent,
        MediaListComponent,
        ButtonsComponent,
        BadgesComponent,
        InputsComponent,
        SwitchComponent,
        CheckboxRadioComponent,
        InputGroupComponent,
        FormLayoutComponent,
        TypographyComponent,
        ColorsComponent,
        TablesComponent,
        CardsComponent,
        CardActionsComponent,
        IconsComponent,
    ],
})
export class UIModule { }
