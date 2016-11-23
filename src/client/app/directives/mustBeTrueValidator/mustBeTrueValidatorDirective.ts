import { Directive, forwardRef, provide, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[mustBeTrue][formControlName],[mustBeTrue][formControl],[mustBeTrue][ngModel]',
  providers: [
    provide(NG_VALIDATORS, { useExisting: forwardRef(() => 
      MustBeTrueValidatorDirective), multi: true })
  ]
})
export class MustBeTrueValidatorDirective implements Validator {
  constructor(@Attribute('mustBeTrue') public mustBeTrue: boolean) {
    
  }
    
  validate(c: AbstractControl): { [key: string]: any } {
	  if(!c.value) {
      return {
        mustBeTrue: true
      };
    }
	
    return null;
  }
}
