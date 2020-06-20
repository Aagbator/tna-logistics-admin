import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';

import { NewFaqComponent } from './dialogs/new-faq/new-faq.component';
import { FaqService } from './faq.service';
import { Faq, Category } from './models/faq.model'

@Component({
    selector: 'app-faq',
    templateUrl: './faq-v2.component.html',
    styleUrls: ['./faq-v2.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FaqV2Component implements OnInit, AfterViewInit {

    @ViewChild("leftSidebar")
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
        private _observableMedia: MediaObserver,
    ) {}

    ngOnInit() {
      
        this._faqService.onFaqsChanged
            .subscribe((data) => {
                this.faqs = data;
            });

        this.categories = this._faqService.categories;

        this._faqService.onActiveCategoryChanged
            .subscribe((data) => {
                this.activeCategory = data;
            });

    }

    ngAfterViewInit()
    {
        this._observableMedia.asObservable()
            .subscribe(() => {
                setTimeout(() => {
                    if(this.leftSidebar) {
                        if ( this._observableMedia.isActive( this.sidebar_hide_breakpoint ) ) {
                            this.leftSidebar.mode = 'side';
                            this.leftSidebar.toggle(true);
                        } else {
                            this.leftSidebar.mode = 'over';
                            this.leftSidebar.toggle(false);
                        }
                    }
                });
            });
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
