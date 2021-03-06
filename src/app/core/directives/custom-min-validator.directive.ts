import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[customMin][formControlName],[customMin][formControl],[customMin][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomMinValidatorDirective, multi: true}]
})
export class CustomMinValidatorDirective {

  @Input()
  customMin: number;

  validate(c: FormControl): {[key: string]: any} {
    const v = c.value;
    return ( v < this.customMin) ? {'customMin': true} : null;
  }

}
