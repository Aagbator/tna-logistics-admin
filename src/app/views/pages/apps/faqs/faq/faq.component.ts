import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

import { NewFaqComponent } from './dialogs/new-faq/new-faq.component';
import { FaqService } from './faq.service';
import { Faq, Category } from './models/faq.model'

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FaqComponent implements OnInit, AfterViewInit {

    @ViewChild("leftSidebar", { static: true })
    leftSidebar: MatSidenav;

    faqs: Faq[] = [];
    categories: Category[];
    activeCategory: any;
    searchText: string = '';
    
    // certain properties to search
    ALLOWED_SEARCH_TARGETS = [
        'question', 'answer'
    ];

    dialogRef: any;

    sidebar_hide_breakpoint: string = 'gt-sm';

    constructor(
        private _faqService: FaqService,
        public _matDialog: MatDialog,
    ) {}

    ngOnInit() {
      
        this._faqService.onFaqsChanged
            .subscribe((data) => {
                this.faqs = data;
            });

        this._faqService.onCategoriesChanged
            .subscribe((data) => {
                this.categories = data;
            });

        this._faqService.onActiveCategoryChanged
            .subscribe((data) => {
                this.activeCategory = data;
            });

    }

    ngAfterViewInit()
    {

    }

    getFaqsByCategory(id)
    {
        this._faqService.getFaqsByCategory(id);
    }

    /**
     * Add New Faq
     */
    newFaqModal(): void
    {
        this.dialogRef = this._matDialog.open(NewFaqComponent, {
            panelClass: 'material-modal',
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const action: string = response[0];
                const formData: FormGroup = response[1];
                
                switch ( action )
                {
                    // Send action
                    case 'send':
                        let data = formData.getRawValue();
                        if(data.question && data.answer && data.category) {
                          this._faqService.addFaq(data);
                        }
                        break;

                }
            });
    }

}
