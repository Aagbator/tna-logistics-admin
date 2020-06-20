import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'src/app/core/components/card/card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubheaderModule } from 'src/app/views/layout/components/subheader/subheader.module';

import { AccordionComponent } from './accordion/accordion.component';
import { AlertComponent } from './alert/alert.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CollapseComponent } from './collapse/collapse.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalComponent } from './modal/modal.component';
import { NgbdModalContentComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PopoverComponent } from './popover/popover.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { RatingComponent } from './rating/rating.component';
import { TabsetComponent } from './tabset/tabset.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';


const routes: Routes = [
    {
        path       : 'accordion',
        component  : AccordionComponent,
    },
    {
        path       : 'alert',
        component  : AlertComponent,
    },
    {
        path       : 'buttons',
        component  : ButtonsComponent,
    },
    {
        path       : 'carousel',
        component  : CarouselComponent,
    },
    {
        path       : 'collapse',
        component  : CollapseComponent,
    },
    {
        path       : 'datepicker',
        component  : DatepickerComponent,
    },
    {
        path       : 'dropdown',
        component  : DropdownComponent,
    },
    {
        path       : 'modal',
        component  : ModalComponent,
    },
    {
        path       : 'pagination',
        component  : PaginationComponent,
    },
    {
        path       : 'popover',
        component  : PopoverComponent,
    },
    {
        path       : 'progressbar',
        component  : ProgressbarComponent,
    },
    {
        path       : 'rating',
        component  : RatingComponent,
    },
    {
        path       : 'tabset',
        component  : TabsetComponent,
    },
    {
        path       : 'timepicker',
        component  : TimepickerComponent,
    },
    {
        path       : 'tooltip',
        component  : TooltipComponent,
    },
    {
        path       : 'typeahead',
        component  : TypeaheadComponent,
    },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NgbModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubheaderModule,
  ],
  declarations: [
    AccordionComponent,
    AlertComponent,
    ButtonsComponent,
    CarouselComponent,
    CollapseComponent,
    DatepickerComponent,
    DropdownComponent,
    ModalComponent,
    NgbdModalContentComponent,
    PaginationComponent,
    PopoverComponent,
    ProgressbarComponent,
    RatingComponent,
    TabsetComponent,
    TimepickerComponent,
    TooltipComponent,
    TypeaheadComponent,
  ],
  entryComponents: [
    NgbdModalContentComponent
  ]
})
export class NgbootstrapModule { }
