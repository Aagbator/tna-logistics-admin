import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, CalendarMonthViewDay } from 'angular-calendar';

import { CalendarEventFormDialogComponent } from './event-form/event-form.component';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { CalendarService } from './calendar.service';
import { CalendarEventModel } from './event.model';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {

    actions: CalendarEventAction[];
    events: CalendarEvent[];
    refresh: Subject<any> = new Subject();
    CalendarView = CalendarView;
    view: CalendarView;
    viewDate: Date = new Date();
    selectedDay: any;
    activeDayIsOpen: boolean;

    confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef: any;


    constructor(
        private _matDialog: MatDialog,
        private _calendarService: CalendarService
    ) { 
        this.view = CalendarView.Month;
        this.activeDayIsOpen = true;
        this.selectedDay = {date: startOfDay(new Date())};

        this.actions = [
            {
                label  : '<i class="material-icons font-16">edit</i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    this.editEvent('edit', event);
                }
            },
            {
                label  : '<i class="material-icons font-16">delete</i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    this.deleteEvent(event);
                }
            }
        ];
    }

    ngOnInit() {

        this.getEvents();

        this.refresh.subscribe(() => {
            
            this._calendarService.updateEvents(this.events)
                .subscribe((response: any) => {
                    this.getEvents();
                });
        });

    }

    getEvents(): void
    {
        this._calendarService.getEvents()
            .subscribe((response: any) => {
                this.setEvents(response);
            });
    }

    /**
     * Set events
     */
    setEvents(events): void
    {
        this.events = events.map(item => {
            item.actions = this.actions;
            return new CalendarEventModel(item);
        });
    }

    /**
     * Day clicked
     */
    dayClicked(day: CalendarMonthViewDay): void
    {
        const date: Date = day.date;
        const events: CalendarEvent[] = day.events;

        if ( isSameMonth(date, this.viewDate) )
        {
            if ( (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0 )
            {
                this.activeDayIsOpen = false;
            }
            else
            {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.selectedDay = day;
    }

    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void
    {
        event.start = newStart;
        event.end = newEnd;
        this.refresh.next();
    }

    /**
     * Edit Event
     */
    editEvent(action: string, event: CalendarEvent): void
    {
        const eventIndex = this.events.indexOf(event);

        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-modal',
            data      : {
                event : event,
                action: action
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

                        this.events[eventIndex] = Object.assign(this.events[eventIndex], formData.getRawValue());
                        this.refresh.next();

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteEvent(event);

                        break;
                }
            });
    }

    /**
     * Delete Event
     */
    deleteEvent(event): void
    {
        this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                const eventIndex = this.events.indexOf(event);
                this.events.splice(eventIndex, 1);
                this.refresh.next();
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * Add Event
     */
    addEvent(): void
    {
        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-modal',
            data      : {
                action: 'new',
                date  : this.selectedDay.date
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
                const newEvent = response.getRawValue();
                newEvent.actions = this.actions;
                this.events.push(newEvent);
                this.refresh.next();
            });
    }

    /**
     * Before View Renderer: Get & set selected day style
     */
    beforeMonthViewRender({header, body}): void
    {
        const _selectedDay = body.find((_day) => {
            return _day.date.getTime() === this.selectedDay.date.getTime();
        });

        if ( _selectedDay )
        {
            /**
             * Set selected day style
             */
            _selectedDay.cssClass = 'cal-selected';
        }
    }

}
