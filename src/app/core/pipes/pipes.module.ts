import { NgModule } from '@angular/core';

import { FilterPipe } from './filter.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import {CheckNullPipe} from './check-null.pipe';

@NgModule({
    declarations: [
        FilterPipe,
        SafeUrlPipe,
        CheckNullPipe,
    ],
    imports     : [],
    exports: [
        FilterPipe,
        SafeUrlPipe,
        CheckNullPipe,
    ]
})
export class PipesModule
{
}
