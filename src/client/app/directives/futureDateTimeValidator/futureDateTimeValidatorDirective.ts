import { Directive, forwardRef, provide, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[futureDateTime][formControlName],[futureDateTime][formControl],[futureDateTime][ngModel]',
  providers: [
    provide(NG_VALIDATORS, { useExisting: forwardRef(() => 
      FutureDateTimeValidatorDirective), multi: true })
  ]
})
export class FutureDateTimeValidatorDirective implements Validator {
  constructor(@Attribute('futureDateTime') public futureDateTime: boolean) {
    
  }
    
  validate(c: AbstractControl): { [key: string]: any } {
	  if(c.value < new Date()) {
      return {
        futureDateTime: true
      };
    }
	
    return null;
  }
}
