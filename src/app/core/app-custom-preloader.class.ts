import { PreloadingStrategy, Route } from '@angular/router';

import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class AppCustomPreloader implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {

    if (route.data && route.data['preload']) {
      // console.log('preload called');
      return load();
    } else {
      // console.log('no preload');
      return of(null);
    }
  }
}


