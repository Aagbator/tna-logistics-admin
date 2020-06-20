import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .card { overflow:hidden }
    .my-custom-class .tooltip-inner {
      background-color: darkgreen;
      font-size: 125%;
    }
    .my-custom-class .arrow::before {
      border-top-color: darkgreen;
    }
  `],
})
export class TooltipComponent implements OnInit {

  name = 'World';

  constructor() { }

  toggleWithGreeting(tooltip, greeting: string) {
    if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      tooltip.open({greeting});
    }
  }

  ngOnInit() {
  }

}
