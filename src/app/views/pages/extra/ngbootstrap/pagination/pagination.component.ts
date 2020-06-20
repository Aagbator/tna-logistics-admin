import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {

  page = 4;
  page2 = 1;
  page3 = 4;
  page4 = 3;
  currentPage = 3;
  isDisabled = true;

  constructor() { }

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  ngOnInit() {
  }

}
