import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';


import { HomeModule } from './components/home/homeModule';

import { ViewConversationModule } from './components/conversation/view/viewConversationModule';
import { AddSpotModule } from './components/spot/add/addSpotModule';
import { ListSpotsModule } from './components/spot/list/listSpotsModule';
import { ChangePasswordModule } from './components/user/changePassword/changePasswordModule';
import { EditUserModule } from './components/user/edit/editUserModule';
import { InitializePasswordResetModule } from './components/user/initializePasswordReset/initializePasswordResetModule';
import { LoginUserModule } from './components/user/login/loginUserModule';
import { LogoutUserModule } from './components/user/logout/logoutUserModule';
import { RegisterUserModule } from './components/user/register/registerUserModule';
import { RegisterUserSuccessModule } from './components/user/registerSuccess/registerUserSuccessModule';
import { ResetPasswordModule } from './components/user/resetPassword/resetPasswordModule';
import { VerifyUserModule } from './components/user/verify/verifyUserModule';
import { SearchSpotsModule } from './components/spot/search/searchSpotsModule';
import { SearchSpotsResultsModule } from './components/spot/searchResults/searchSpotsResultsModule';


//import { CompareValidatorDirective } from './directives/compareValidator/compareValidatorDirective';
//import { MustBeTrueValidatorDirective } from './directives/must-be-true.directive';
//import { RequiredIfValidatorDirective } from './directives/required-if.directive';
//import { CompareValidator } from './directives/compare.directive';


import { CompareValidatorModule } from './directives/compareValidator/compareValidatorModule';


import { AboutModule } from './+about/about.module';

import { LoggedInGuard } from './loggedInGuard';
import { AuthenticationService } from './services/authentication/authentication.service';
import { CustomHttpService } from './services/customHttp/customHttp.service';

import { NavbarModule } from './components/shared/navbar/navbarModule';
 
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AboutModule,
    HomeModule,
    ViewConversationModule,
    AddSpotModule,
    ListSpotsModule,
    ChangePasswordModule,
    EditUserModule,
    InitializePasswordResetModule,
    LoginUserModule,
    LogoutUserModule,
    RegisterUserModule,
    RegisterUserSuccessModule,
    ResetPasswordModule,
    VerifyUserModule,
    SearchSpotsModule,
    SearchSpotsResultsModule,
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
    AuthenticationService,
    CustomHttpService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
