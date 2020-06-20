import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {

    constructor(
        private _httpClient: HttpClient
    )
    {}

    getEvents()
    {
        return this._httpClient.get('api/calendar-events');
    }

    updateEvents(events)
    {
        return this._httpClient.post('api/calendar-events', [...events]);
    }

}
