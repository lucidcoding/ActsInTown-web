import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterUserSuccessComponent } from './registerUserSuccessComponent';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [RegisterUserSuccessComponent],
    exports: [RegisterUserSuccessComponent],
    providers: []
})

export class RegisterUserSuccessModule { }
