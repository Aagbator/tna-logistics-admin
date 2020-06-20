import { Pipe, PipeTransform } from '@angular/core';
import { Helpers } from '../helpers/helpers';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform
{
    /**
     * Transform
     */
    transform(mainArr: any[], searchText: string, allowedTargets? : any[], disabledTargets? : any[]): any
    {
        return Helpers.filterArrayByString(mainArr, searchText, allowedTargets, disabledTargets);
    }
}
