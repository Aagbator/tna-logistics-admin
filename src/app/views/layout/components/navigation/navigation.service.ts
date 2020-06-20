import { Injectable } from '@angular/core';

import { NAVIGATION } from './navigation-data';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor() { }

    getNavigation() {
        return NAVIGATION || [];
    }
}
