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
import { LoginUserModule } from './components/user/login/loginUserModule';
import { LogoutUserModule } from './components/user/logout/logoutUserModule';
import { RegisterUserModule } from './components/user/register/registerUserModule';
import { VerifyUserModule } from './components/user/verify/verifyUserModule';
import { SearchAvailableSpotsModule } from './components/spot/searchAvailable/searchAvailableSpotsModule';


//import { CompareValidator } from './directives/compare.directive';


import { AboutModule } from './+about/about.module';

import { LoggedInGuard } from './loggedInGuard';
import { AuthenticationService } from './services/authentication/authentication.service';

import { NavbarModule } from './components/shared/navbar/navbarModule';
 
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AboutModule,
    HomeModule,
    AddSpotModule,
    ListSpotsModule,
    LoginUserModule,
    LogoutUserModule,
    RegisterUserModule,
    VerifyUserModule,
    SearchAvailableSpotsModule,
    //DateSelectorModule,
    //SharedModule.forRoot(),
    NavbarModule
    //,FormsModule
  ],
  declarations: [
    AppComponent
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
