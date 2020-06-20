import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { Mail } from './mail.model';
import { Helpers } from 'src/app/core/helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class MailService 
{
    mails: Mail[];
    selectedMails: Mail[];
    currentMail: Mail;
    searchText = '';
    DELFAULT_FOLDER_ID: number = 0; // inbox folder
    DELETED_FOLDER_ID = 4;

    folders: any[];
    filters: any[];
    labels: any[];
    routeParams: any;

    onMailsChanged: BehaviorSubject<any>;
    onSelectedMailsChanged: BehaviorSubject<any>;
    onCurrentMailChanged: BehaviorSubject<any>;
    onFoldersChanged: BehaviorSubject<any>;
    onFiltersChanged: BehaviorSubject<any>;
    onLabelsChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    
    // certain properties to search
    ALLOWED_SEARCH_TARGETS = [
        'subject', 'message', 'time', 'from.name', 'from.email'
    ];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private router: Router,
    )
    {
        // Set the defaults
        this.selectedMails = [];
        this.onMailsChanged = new BehaviorSubject([]);
        this.onSelectedMailsChanged = new BehaviorSubject([]);
        this.onCurrentMailChanged = new BehaviorSubject([]);
        this.onFoldersChanged = new BehaviorSubject([]);
        this.onFiltersChanged = new BehaviorSubject([]);
        this.onLabelsChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();

        this.onSearchTextChanged.subscribe(searchText => {
            this.searchText = searchText;
            this.getMails();
        });
    }

    /**
     * Resolver
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {
            Promise.all([
                this.getFolders(),
                this.getFilters(),
                this.getLabels(),
                this.getMails()
            ]).then(
                () => {
                    if ( this.routeParams.mailId )
                    {
                        this.setCurrentMail(this.routeParams.mailId);
                    }
                    else
                    {
                        this.setCurrentMail(null);
                    }

                    resolve();
                },
                reject
            );
        });
    }


    /**
     * Get all folders
     */
    getFolders(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/mail-folders')
                .subscribe((response: any) => {
                    this.folders = response;
                    this.onFoldersChanged.next(this.folders);
                    resolve(this.folders);
                }, reject);
        });
    }

    /**
     * Get all filters
     */
    getFilters(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/mail-filters')
                .subscribe((response: any) => {
                    this.filters = response;
                    this.onFiltersChanged.next(this.filters);
                    resolve(this.filters);
                }, reject);
        });
    }

    /**
     * Get all labels
     */
    getLabels(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/mail-labels')
                .subscribe((response: any) => {
                    this.labels = response;
                    this.onLabelsChanged.next(this.labels);
                    resolve(this.labels);
                }, reject);
        });
    }

    /**
     * Get all mails
     */
    getMails(): Promise<Mail[]>
    {
        if ( this.routeParams.labelHandle )
        {
            return this.getMailsByLabel(this.routeParams.labelHandle);
        }

        if ( this.routeParams.filterHandle )
        {
            return this.getMailsByFilter(this.routeParams.filterHandle);
        }

        return this.getMailsByFolder(this.routeParams.folderHandle);
    }

    /**
     * Get mails by folder
     */
    getMailsByFolder(folder): Promise<Mail[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/mail-folders?handle=' + folder)
                .subscribe((folders: any) => {
                    
                    // if the folder is not found, go to the inbox folder
                    if( !folders.length ) {
                        this.goInbox();
                        reject;
                    } else {
                        const folderId = folders[0].id;

                        this._httpClient.get('api/mail-mails?folder=' + folderId)
                            .subscribe((mails: any) => {

                                this.mails = mails.map(mail => {
                                    return new Mail(mail);
                                });

                                this.mails = Helpers.filterArrayByString(this.mails, this.searchText, this.ALLOWED_SEARCH_TARGETS);
                                
                                this.onMailsChanged.next(this.mails);

                                resolve(this.mails);

                            }, reject);
                    }
                });
        });
    }

    /**
     * Get mails by filter
     */
    getMailsByFilter(handle): Promise<Mail[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/mail-mails?' + handle + '=true')
                .subscribe((mails: any) => {
                    this.mails = mails.map(mail => {
                        return new Mail(mail);
                    });

                    this.mails = Helpers.filterArrayByString(this.mails, this.searchText, this.ALLOWED_SEARCH_TARGETS);

                    this.onMailsChanged.next(this.mails);

                    resolve(this.mails);

                }, reject);
        });
    }

    /**
     * Get mails by label
     */
    getMailsByLabel(handle): Promise<Mail[]>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/mail-labels?handle=' + handle)
                .subscribe((labels: any) => {

                    // if the label is not found, go to the inbox folder
                    if( !labels.length ) {
                        this.goInbox();
                        reject;
                    } else {
                        const labelId = labels[0].id;

                        this._httpClient.get('api/mail-mails?labels=' + labelId)
                            .subscribe((mails: any) => {

                                this.mails = mails.map(mail => {
                                    return new Mail(mail);
                                });

                                this.mails = Helpers.filterArrayByString(this.mails, this.searchText, this.ALLOWED_SEARCH_TARGETS);

                                this.onMailsChanged.next(this.mails);

                                resolve(this.mails);

                            }, reject);
                    }
                });
        });
    }
    
    /**
     * Go to the inbox folder
     */
    goInbox(): void
    {
        this.router.navigate(['apps/mail/inbox']);
    }

    /**
     * Toggle selected mail by id
     */
    toggleSelectedMail(id): void
    {
        // First, check if we already have that mail as selected...
        if ( this.selectedMails.length > 0 )
        {
            for ( const mail of this.selectedMails )
            {
                // ...delete the selected mail
                if ( mail.id === id )
                {
                    const index = this.selectedMails.indexOf(mail);

                    if ( index !== -1 )
                    {
                        this.selectedMails.splice(index, 1);

                        // Trigger the next event
                        this.onSelectedMailsChanged.next(this.selectedMails);

                        // Return
                        return;
                    }
                }
            }
        }

        // If we don't have it, push as selected
        this.selectedMails.push(
            this.getMailById(id)
        );

        // Trigger the next event
        this.onSelectedMailsChanged.next(this.selectedMails);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedMails.length > 0 )
        {
            this.deselectMails();
        }
        else
        {
            this.selectMails();
        }
    }

    /**
     * Select mails
     */
    selectMails(filterParameter?, filterValue?): void
    {
        this.selectedMails = [];

        // If there is no filter, select all mails
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedMails = Array.from(this.mails);
        }
        else
        {
            this.selectedMails.push(...
                this.mails.filter(mail => {
                    return mail[filterParameter] === filterValue;
                })
            );
        }

        // Trigger the next event
        this.onSelectedMailsChanged.next(this.selectedMails);
    }

    /**
     * Deselect mails
     */
    deselectMails(): void
    {
        this.selectedMails = [];

        // Trigger the next event
        this.onSelectedMailsChanged.next(this.selectedMails);
    }


    /**
     * Set current mail by id
     */
    setCurrentMail(id): void
    {
        let mail = this.getMailById(id);
        this.currentMail = mail;

        if( mail && !this.currentMail.read ) {
            mail.markRead();
            this._httpClient.post('api/mail-mails/' + mail.id, {...mail})
                .subscribe(response => {});
        }

        this.onCurrentMailChanged.next(this.currentMail);
    }

    /**
     * Update the mail
     */
    updateMail(mail, updateMailList = true)
    {
        let response$ = this._httpClient.post('api/mail-mails/' + mail.id, {...mail});

        // If current listing in filter folders (starred, important) then update mail list
        if(updateMailList)
        {
            response$.subscribe(response => {

                this.getMails().then(mails => {
                    if ( mails && this.currentMail )
                    {
                        this.setCurrentMail(this.currentMail.id);
                    }
                });
            });
        } else {
            response$.subscribe(response => {});
        }
    }

    /**
     * Toggle label on selected mails
     */
    toggleLabelOnSelectedMails(labelId): void
    {
        this.selectedMails.map(mail => {

            const index = mail.labels.indexOf(labelId);

            if ( index !== -1 )
            {
                mail.labels.splice(index, 1);
            }
            else
            {
                mail.labels.push(labelId);
            }

            this.updateMail(mail);
        });
    }

    /**
     * Set folder on selected mails
     */
    setFolderOnSelectedMails(folderId): void
    {
        this.selectedMails.map(mail => {
            mail.folder = folderId;

            this.updateMail(mail);
        });

        this.deselectMails();
    }

    /**
     * Delete mail (move to trash folder)
     */
    deleteMail(mail): void
    {
        mail.folder = this.DELETED_FOLDER_ID;
        this.updateMail(mail);
        this.setCurrentMail(null);
        this.deselectMails();
    }

    /**
     * Get label by id
     */
    getMailById(id): Mail | undefined
    {
        return this.mails.find(mail => {
            return mail.id === id;
        });
    }

}
