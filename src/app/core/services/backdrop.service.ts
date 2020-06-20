import { Injectable, Output, ElementRef, EventEmitter, Directive } from '@angular/core';

import { DOCUMENT } from '@angular/common';

@Directive()
@Injectable({
  providedIn: 'root'
})
export class BackdropService {

  constructor() {}

  @Output() open: EventEmitter<boolean> = new EventEmitter();
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  show() {
    this.open.emit();
  }

  hide() {
    this.close.emit();
  }

}
