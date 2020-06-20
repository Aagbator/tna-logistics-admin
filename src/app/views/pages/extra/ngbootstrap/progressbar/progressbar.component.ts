import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styles: [`
    ngb-progressbar {
      margin-top: 5rem;
    }
  `]
})
export class ProgressbarComponent implements OnInit {

  height = '20px';

  constructor() { }

  ngOnInit() {
  }

}
