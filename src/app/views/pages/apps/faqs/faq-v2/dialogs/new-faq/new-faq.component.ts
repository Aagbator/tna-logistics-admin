import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FaqService } from '../../faq.service';

@Component({
    selector: 'new-faq',
    templateUrl: './new-faq.component.html',
    styleUrls: ['./new-faq.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NewFaqComponent {

    composeForm: FormGroup;
    select;
    categories: any[];

    constructor(
        public matDialogRef: MatDialogRef<NewFaqComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _faqService: FaqService,
    )
    {
        // Set the defaults
        this.composeForm = this.createComposeForm();
    }

    ngOnInit() 
    {
        this.categories = this._faqService.categories;
    }

    /**
     * Create compose form
     */
    createComposeForm(): FormGroup
    {
        return new FormGroup({
  	        category: new FormControl('', [Validators.required]),
            question: new FormControl('', [Validators.required]),
            answer: new FormControl('', [Validators.required])
        });
    }

}
