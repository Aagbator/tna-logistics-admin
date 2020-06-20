import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import {SectionService} from '../../../core/services/section/section.service';

@Injectable()
export class SectionResolver implements Resolve<any> {
  constructor(private sectionService: SectionService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.sectionService.getSections();
  }
}

