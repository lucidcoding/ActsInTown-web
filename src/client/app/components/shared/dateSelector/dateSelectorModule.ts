import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DateSelectorComponent } from '../../shared/dateSelector/dateSelectorComponent';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [DateSelectorComponent],
    exports: [DateSelectorComponent],
    providers: []
})

export class DateSelectorModule { }
