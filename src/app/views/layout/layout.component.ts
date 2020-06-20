import { Component, OnInit, AfterViewInit } from '@angular/core';

declare let MetisMenu: any;

@Component({
    selector: 'layout.content-wrapper',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
	    new MetisMenu("#sidenav");
    }

}
