import { Component, OnDestroy, OnInit, AfterViewInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';


import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { ContactFormDialogComponent } from './contact-form/contact-form.component';
import { ContactsService } from './contacts.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ContactsComponent implements OnInit, OnDestroy, AfterViewInit {
    
    @ViewChild("leftSidebar", { static: true })
    leftSidebar: MatSidenav;

    contacts: any;
    user: any;
    filterBy: string;

    dialogRef: any;
    confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

    hasSelectedContacts: boolean;
    selectedContacts: any[];
    selectedContact: any;
    checkboxes: {};
    searchInput: FormControl;
    sidebar_hide_breakpoint: string = 'gt-sm';

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _contactsService: ContactsService,
        private _matDialog: MatDialog,
        private _observableMedia: MediaObserver,
    ) { 
        this.searchInput = new FormControl('');
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() 
    {
        this.filterBy = this._contactsService.filterBy || 'all';

        this._contactsService.onContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(contacts => {
                this.contacts = contacts;

                this.checkboxes = {};
                contacts.map(contact => {
                    this.checkboxes[contact.id] = false;
                });
            });

        this._contactsService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });

        this._contactsService.onSelectedContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContacts => {
                this.hasSelectedContacts = selectedContacts.length > 0;

                for ( const id in this.checkboxes )
                {
                    if ( !this.checkboxes.hasOwnProperty(id) )
                    {
                        continue;
                    }

                    this.checkboxes[id] = selectedContacts.includes(id);
                }
                this.selectedContacts = selectedContacts;
            });
            
        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._contactsService.onSearchTextChanged.next(searchText);
            });

        this._contactsService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._contactsService.deselectContacts();
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
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Change the filter
     */
    changeFilter(filter): void
    {
        this.filterBy = filter;
        this._contactsService.onFilterChanged.next(this.filterBy);
    }

    /**
     * On selected change
     */
    onSelectedChange(contactId): void
    {
        this._contactsService.toggleSelectedContact(contactId);
    }

    selectContact(contact): void
    {
        this.selectedContact = contact;
    }

    deselectCurrentContact(): void
    {
        this.selectedContact = null;
    }

    toggleStar(contactId): void
    {
        this._contactsService.toggleStar(contactId);
    }

    /**
     * Delete Contact
     */
    deleteContact(contact): void
    {
        this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._contactsService.deleteContact(contact);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * Delete selected contacts
     */
    deleteSelectedContacts(): void
    {
        this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected contacts?';

        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if ( result )
                {
                    this._contactsService.deleteSelectedContacts();
                }
                this.confirmDialogRef = null;
            });
    }

    /**
     * Edit contact
     */
    editContact(contact): void
    {
        this.dialogRef = this._matDialog.open(ContactFormDialogComponent, {
            panelClass: 'material-modal',
            data        : {
                contact: contact,
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':

                        this._contactsService.updateContact(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteContact(contact);

                        break;
                }
            });
    }

    /**
     * New contact
     */
    newContact(): void
    {
        this.dialogRef = this._matDialog.open(ContactFormDialogComponent, {
            panelClass: 'material-modal',
            data        : {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }

                this._contactsService.updateContact(response.getRawValue());
            });
    }

}
