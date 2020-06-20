import { Component, OnInit, ViewChild } from '@angular/core';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';

@Component({
    selector: 'app-google-maps',
    templateUrl: './google-maps.component.html',
    styleUrls: ['./google-maps.component.css'],
    styles: [`
        agm-map {
            height: 400px;
        }
    `],
})
export class GoogleMapsComponent implements OnInit {

    @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;

    center = {lat: 24, lng: 12};
    markerOptions = {draggable: false};
    markerPositions: google.maps.LatLngLiteral[] = [];
    zoom = 4;
    display?: google.maps.LatLngLiteral;


    addMarker(event: google.maps.MouseEvent) {
        this.markerPositions.push(event.latLng.toJSON());
    }

    move(event: google.maps.MouseEvent) {
        this.display = event.latLng.toJSON();
    }

    openInfoWindow(marker: MapMarker) {
        this.infoWindow.open(marker);
    }

    removeLastMarker() {
        this.markerPositions.pop();
    }

    constructor() { }

    ngOnInit() {
    }

}
