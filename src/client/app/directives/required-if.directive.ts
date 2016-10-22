import { Directive, forwardRef, provide, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[requiredIf][formControlName],[requiredIf][formControl],[requiredIf][ngModel]',
  //selector: '[requiredIf][ngControl]',
  providers: [
    provide(NG_VALIDATORS, { useExisting: forwardRef(() => RequiredIfValidatorDirective), multi: true })
  ]
})
export class RequiredIfValidatorDirective implements Validator {
  //@Input('requiredIf') requiredIf: boolean;
  
  constructor( 
    @Attribute('requiredIf') public requiredIf: string) {
    
  }
    
  /*ngOnChanges() {
    // Called when required is updated
    if (this.control) {
      this.control.updateValueAndValidity();
    }
  }*/

  validate(control: AbstractControl): { [key: string]: any } {
    //this.control = control;
    return this.requiredIf && !control.value
      ? { requiredIf: true }
      : null;
  }
}

//http://stackoverflow.com/questions/36986375/conditional-required-validator-directive-in-angular-2
//https://plnkr.co/edit/14jDdUj1rdzAaLEBaB9G?p=preview
