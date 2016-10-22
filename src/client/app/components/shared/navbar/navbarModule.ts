import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbarComponent';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
    providers: []
})

export class NavbarModule { }
