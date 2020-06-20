import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkNull'
})
export class CheckNullPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value || value === undefined) {
      if (args) {
        return args;
      } else {
        return '-';
      }
    } else {
      return value;
    }
    return null;
  }

}
