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
  constructor(@Attribute('futureDate') public futureDateTime: boolean) {
    
  }
    
  validate(c: AbstractControl): { [key: string]: any } {
      if (c.value === null) {
          return null;
      }
      
      let now = new Date();
      let currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      let selectedDate = new Date(c.value.getFullYear(), c.value.getMonth(), c.value.getDate());
      
	  if(selectedDate < currentDate) {
      return {
        futureDate: true
      };
    }
	
    return null;
  }
}
