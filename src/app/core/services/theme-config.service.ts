import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Constants } from 'src/app/config';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    public config: any;
    public _configSubject: BehaviorSubject<any>;

    constructor(
    ) {
        this.config = Constants;
        this._configSubject = new BehaviorSubject(this.config);
    }

    setModel(model: any) {
        this.config = Object.assign({}, this.config, model);
        this._configSubject.next(this.config);
    }

}
