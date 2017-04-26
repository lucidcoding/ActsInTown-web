import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PagerComponent } from '../../shared/pager/pagerComponent';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [PagerComponent],
    exports: [PagerComponent],
    providers: []
})

export class PagerModule { }
