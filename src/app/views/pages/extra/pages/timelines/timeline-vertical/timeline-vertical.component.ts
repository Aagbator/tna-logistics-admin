import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-vertical',
  templateUrl: './timeline-vertical.component.html',
  styleUrls: ['./timeline-vertical.component.scss']
})
export class TimelineVerticalComponent implements OnInit {

  timeline1_center: boolean = true;
  timeline2_center: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
