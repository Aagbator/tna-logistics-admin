import { Component, OnInit } from '@angular/core';

import { NavigationService } from './navigation.service';
import {Menu} from './navigation.model';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    constructor(private _navigationService: NavigationService) { }

    navigation: Menu[] = [];

    ngOnInit() {
        this.navigation = this._navigationService.getNavigation();
    }

}
