import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './homeComponent';
//import { UserService, UserServiceToken } from '../../services/user/user.service';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [HomeComponent],
    exports: [HomeComponent],
    providers: []
})

export class HomeModule { }
