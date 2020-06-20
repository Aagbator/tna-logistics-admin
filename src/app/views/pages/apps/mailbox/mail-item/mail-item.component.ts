import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MailService } from '../mail.service';
import { Mail } from '../mail.model';

@Component({
    selector: 'mail-item',
    templateUrl: './mail-item.component.html',
    styleUrls: ['./mail-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MailItemComponent implements OnInit, OnDestroy
{
    @Input() mail: Mail;

    @HostBinding('class.selected')
    selected: boolean;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _mailService: MailService
    )
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this.mail = new Mail(this.mail);

        this._mailService.onSelectedMailsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedMails => {
                this.selected = false;

                if ( selectedMails.length > 0 )
                {
                    for ( const mail of selectedMails )
                    {
                        if ( mail.id === this.mail.id )
                        {
                            this.selected = true;
                            break;
                        }
                    }
                }
            });
    }

    
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    

    onSelectedChange(): void
    {
        this._mailService.toggleSelectedMail(this.mail.id);
    }

    toggleStar(event): void
    {
        event.stopPropagation();

        this.mail.toggleStar();

        this._mailService.updateMail(this.mail);
    }

    toggleImportant(event): void
    {
        event.stopPropagation();

        this.mail.toggleImportant();

        this._mailService.updateMail(this.mail);
    }

    getLabel(id)
    {
        return this._mailService.labels.find(label => {
            return label.id === id;
        });
    }
}
