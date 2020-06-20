import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector     : 'mail-compose',
    templateUrl  : './compose.component.html',
    styleUrls    : ['./compose.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MailComposeDialogComponent
{
    composeForm: FormGroup;

    constructor(
        public matDialogRef: MatDialogRef<MailComposeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any
    )
    {
        // Set the defaults
        this.composeForm = this.createComposeForm();
    }


    /**
     * Create compose form
     */
    createComposeForm(): FormGroup
    {
        return new FormGroup({
            to     : new FormControl(''),
            subject: new FormControl(''),
            message: new FormControl('')
        });
    }

}
