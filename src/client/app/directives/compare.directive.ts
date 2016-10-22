import { Directive, forwardRef, provide, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[compare][formControlName],[compare][formControl],[compare][ngModel]',
  providers: [
    provide(NG_VALIDATORS, { useExisting: forwardRef(() => 
      CompareValidatorDirective), multi: true })
  ]
})
export class CompareValidatorDirective implements Validator {
  constructor( 
    @Attribute('compare') public compare: string,
    @Attribute('compareReverse') public compareReverse: string) {
    //
  }
  
  private get isReverse() {
    if (!this.compareReverse) return false;
    return this.compareReverse === 'true' ? true: false;
  }
    
  validate(c: AbstractControl): { [key: string]: any } {
    let v = c.value; 
    let e = c.root.find(this.compare);

    if (e && v !== e.value && !this.isReverse) {
      return {
        compare: true
      };
    }

    if (e && v === e.value && this.isReverse) {
      delete e.errors['compare'];
      
      if (!Object.keys(e.errors).length) e.setErrors(null);
    }

    if (e && v !== e.value && this.isReverse) {
      e.setErrors({
        compare: true
      });
    }
    
    return null;
  }
}
