import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogoutUserComponent } from './logoutUserComponent';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [LogoutUserComponent],
    exports: [LogoutUserComponent],
    providers: []
})

export class LogoutUserModule { }
