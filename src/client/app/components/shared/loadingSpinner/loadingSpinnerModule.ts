import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
//import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './loadingSpinnerComponent';

@NgModule({
    //imports: [CommonModule, FormsModule, RouterModule],
    declarations: [LoadingSpinnerComponent],
    exports: [LoadingSpinnerComponent],
    providers: []
})

export class LoadingSpinnerModule { }
