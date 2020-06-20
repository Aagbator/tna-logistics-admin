import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .my-custom-class {
      background: aliceblue;
      font-size: 125%;
    }
    .my-custom-class .arrow::after {
      border-top-color: aliceblue;
    }
  `]
})
export class PopoverComponent implements OnInit {

  name = 'World';
  lastShown: Date;
  lastHidden: Date;

  constructor() { }

  toggleWithGreeting(popover, greeting: string, language: string) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open({greeting, language});
    }
  }

  recordShown() {
    this.lastShown = new Date();
  }

  recordHidden() {
    this.lastHidden = new Date();
  }

  ngOnInit() {
  }

}
