import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DateTimeSelectorComponent } from './dateTimeSelectorComponent';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [DateTimeSelectorComponent],
    exports: [DateTimeSelectorComponent],
    providers: []
})

export class DateTimeSelectorModule { }
