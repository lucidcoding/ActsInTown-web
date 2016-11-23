import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';


import { HomeModule } from './components/home/homeModule';
import { AddSpotModule } from './components/spot/add/addSpotModule';
import { ListSpotsModule } from './components/spot/list/listSpotsModule';
import { EditUserModule } from './components/user/edit/editUserModule';
import { InitializePasswordResetModule } from './components/user/initializePasswordReset/initializePasswordResetModule';
import { LoginUserModule } from './components/user/login/loginUserModule';
import { LogoutUserModule } from './components/user/logout/logoutUserModule';
import { RegisterUserModule } from './components/user/register/registerUserModule';
import { RegisterUserSuccessModule } from './components/user/registerSuccess/registerUserSuccessModule';
import { ResetPasswordModule } from './components/user/resetPassword/resetPasswordModule';
import { VerifyUserModule } from './components/user/verify/verifyUserModule';
import { SearchAvailableSpotsModule } from './components/spot/searchAvailable/searchAvailableSpotsModule';
import { SearchAvailableSpotsResultsModule } from './components/spot/searchAvailableResults/searchAvailableSpotsResultsModule';


//import { CompareValidatorDirective } from './directives/compareValidator/compareValidatorDirective';
//import { MustBeTrueValidatorDirective } from './directives/must-be-true.directive';
//import { RequiredIfValidatorDirective } from './directives/required-if.directive';
//import { CompareValidator } from './directives/compare.directive';


import { CompareValidatorModule } from './directives/compareValidator/compareValidatorModule';


import { AboutModule } from './+about/about.module';

import { LoggedInGuard } from './loggedInGuard';
import { AuthenticationService } from './services/authentication/authentication.service';

import { NavbarModule } from './components/shared/navbar/navbarModule';
 
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AboutModule,
    HomeModule,
    AddSpotModule,
    ListSpotsModule,
    EditUserModule,
    InitializePasswordResetModule,
    LoginUserModule,
    LogoutUserModule,
    RegisterUserModule,
    RegisterUserSuccessModule,
    ResetPasswordModule,
    VerifyUserModule,
    SearchAvailableSpotsModule,
    SearchAvailableSpotsResultsModule,
    //DateSelectorModule,
    //SharedModule.forRoot(),
    NavbarModule,
    //,FormsModule
    RouterModule.forRoot(routes),
    CompareValidatorModule
  ],
  declarations: [
    AppComponent,
    //CompareValidatorDirective,
    //MustBeTrueValidatorDirective,
    //RequiredIfValidatorDirective
    //,
    //CompareValidator,
  ],
  providers: [{
        provide: APP_BASE_HREF,
        useValue: '<%= APP_BASE %>'
    }, 
    LoggedInGuard,
    AuthenticationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
