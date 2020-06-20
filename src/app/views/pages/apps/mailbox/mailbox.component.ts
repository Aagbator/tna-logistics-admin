import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';

import { MailComposeDialogComponent } from './dialogs/compose/compose.component';

import { MailService } from './mail.service';
import { Mail } from './mail.model';

@Component({
    selector: 'app-mailbox',
    templateUrl: './mailbox.component.html',
    styleUrls: ['./mailbox.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MailComponent implements OnInit, OnDestroy, AfterViewInit
{
    @ViewChild("leftSidebar", { static: true })
    leftSidebar: MatSidenav;

    hasSelectedMails: boolean;
    isIndeterminate: boolean;
    
    folders: any[];
    filters: any[];
    labels: any[];
    
    searchInput: FormControl;
    currentMail: Mail;
    dialogRef: any;
    sidebar_hide_breakpoint: string = 'gt-sm';

    mails: Mail[];

    private _unsubscribeAll: Subject<any>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _location: Location,
        private _mailService: MailService,
        public _matDialog: MatDialog,
        private _observableMedia: MediaObserver,
    ) {
        this._unsubscribeAll = new Subject();
        this.searchInput = new FormControl('');
    }

    ngOnInit() {
        this._mailService.onMailsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(mails => {
                this.mails = mails;
            });

        this._mailService.onFoldersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.folders = this._mailService.folders;
            });

        this._mailService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.filters = this._mailService.filters;
            });

        this._mailService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = this._mailService.labels;
            });

        this._mailService.onCurrentMailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentMail => {
                if ( !currentMail )
                {
                    this.currentMail = null;

                    const labelHandle  = this.route.snapshot.params.labelHandle,
                          filterHandle = this.route.snapshot.params.filterHandle,
                          folderHandle = this.route.snapshot.params.folderHandle;

                    if ( labelHandle )
                    {
                        this._location.go('apps/mail/label/' + labelHandle);
                    }
                    else if ( filterHandle )
                    {
                        this._location.go('apps/mail/filter/' + filterHandle);
                    }
                    else
                    {
                        this._location.go('apps/mail/' + folderHandle);
                    }
                }
                else
                {
                    this.currentMail = currentMail;
                }
            });

        this._mailService.onSelectedMailsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedMails => {
                setTimeout(() => {
                    this.hasSelectedMails = selectedMails.length > 0;
                    this.isIndeterminate = (selectedMails.length !== this._mailService.mails.length && selectedMails.length > 0);
                }, 0);
            });
        
        this._mailService.onSearchTextChanged.next('');
        this.searchInput.valueChanges.pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(300),
            distinctUntilChanged()
        )
        .subscribe(searchText => {
            this._mailService.onSearchTextChanged.next(searchText);
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

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    /**
     * Read mail
     */
    readMail(mailId): void
    {
        const labelHandle  = this.route.snapshot.params.labelHandle,
              filterHandle = this.route.snapshot.params.filterHandle,
              folderHandle = this.route.snapshot.params.folderHandle;

        if ( labelHandle )
        {
            this._location.go('apps/mail/label/' + labelHandle + '/' + mailId);
        }
        else if ( filterHandle )
        {
            this._location.go('apps/mail/filter/' + filterHandle + '/' + mailId);
        }
        else
        {
            this._location.go('apps/mail/' + folderHandle + '/' + mailId);
        }

        // Set current mail
        this._mailService.setCurrentMail(mailId);
    }

    toggleSelectAll(): void
    {
        this._mailService.toggleSelectAll();
    }

    selectMails(filterParameter?, filterValue?): void
    {
        this._mailService.selectMails(filterParameter, filterValue);
    }

    /**
     * Deselect mails
     */
    deselectMails(): void
    {
        this._mailService.deselectMails();
    }

    /**
     * Deselect current mail
     */
    deselectCurrentMail(): void
    {
        this._mailService.onCurrentMailChanged.next(null);
    }


    /**
     * Toggle star
     */
    toggleStar(event): void
    {
        event.stopPropagation();

        this.currentMail.toggleStar();

        this._mailService.updateMail(this.currentMail, !!this.route.snapshot.params.filterHandle);
    }

    /**
     * Toggle important
     */
    toggleImportant(event): void
    {
        event.stopPropagation();

        this.currentMail.toggleImportant();

        this._mailService.updateMail(this.currentMail, !!this.route.snapshot.params.filterHandle);
    }

    /**
     * Delete current mail
     */

    deleteCurrentMail(event): void
    {
        event.stopPropagation();

        this._mailService.deleteMail(this.currentMail);
    }

    /**
     * Get label by id
     */
    getLabel(id)
    {
        return this.labels.find(label => {
            return label.id === id;
        });
    }


    /**
     * Delete mails
     */
    deleteMails(): void
    {
        this.setFolderOnSelectedMails(4);
    }

    /**
     * Toggle label on selected mails
     */
    toggleLabelOnSelectedMails(labelId): void
    {
        this._mailService.toggleLabelOnSelectedMails(labelId);
    }

    /**
     * Set folder on selected mails
     */
    setFolderOnSelectedMails(folderId): void
    {
        this._mailService.setFolderOnSelectedMails(folderId);
    }

    /**
     * Compose email
     */
    composeModal(): void
    {
        this.dialogRef = this._matDialog.open(MailComposeDialogComponent, {
            panelClass: 'mail-compose-modal',
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
                        console.log('New Mail Sent', formData.getRawValue());
                        break;

                    // Delete action
                    case 'delete':
                        console.log('Delete Mail');
                        break;
                }
            });
    
    }

}
