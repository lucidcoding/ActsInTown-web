import { Directive, forwardRef, provide, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[futureDate][formControlName],[futureDate][formControl],[futureDate][ngModel]',
  providers: [
    provide(NG_VALIDATORS, { useExisting: forwardRef(() => 
      FutureDateValidatorDirective), multi: true })
  ]
})
export class FutureDateValidatorDirective implements Validator {
  constructor(@Attribute('futureDate') public futureDate: boolean) {
    
  }
    
  validate(c: AbstractControl): { [key: string]: any } {
	  if(c.value < new Date()) {
      return {
        futureDate: true
      };
    }
	
    return null;
  }
}
