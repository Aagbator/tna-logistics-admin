import { Component, OnInit } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
})
export class TimepickerComponent implements OnInit {

  time = {hour: 13, minute: 30};
  time2 = {hour: 13, minute: 30};
  time3: NgbTimeStruct = {hour: 13, minute: 30, second: 30};
  time4 = {hour: 13, minute: 30};
  time5: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  meridian = true;
  seconds = true;
  spinners = true;
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;

  constructor() { }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  toggleSeconds() {
    this.seconds = !this.seconds;
  }

  toggleSpinners() {
    this.spinners = !this.spinners;
  }

  ctrl = new FormControl('', (control: FormControl) => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.hour < 12) {
      return {tooEarly: true};
    }
    if (value.hour > 13) {
      return {tooLate: true};
    }

    return null;
  });

  ngOnInit() {
  }

}
