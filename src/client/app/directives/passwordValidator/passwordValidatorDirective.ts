import { Directive, forwardRef, provide, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[password][formControlName],[password][formControl],[password][ngModel]',
    providers: [
        provide(NG_VALIDATORS, { useExisting: forwardRef(() => 
        PasswordValidatorDirective), multi: true })
    ]
})
export class PasswordValidatorDirective implements Validator {
    constructor(@Attribute('password') public password: boolean) {
        //
    }
    
    validate(c: AbstractControl): { [key: string]: any } {
        var pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W)\\S{6,15}$');

        if(typeof c.value !== 'undefined' && c.value !== null && c.value !== '' && !pattern.test(c.value)) {
            return {
                password: true
            };
        }
        
        return null;
    }
}
