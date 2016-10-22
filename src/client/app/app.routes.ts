import { Routes } from '@angular/router';
import { LoggedInGuard } from './loggedInGuard';

import { HomeComponent } from './components/home/homeComponent';
import { AddSpotComponent } from './components/spot/add/addSpotComponent';
import { ListSpotsComponent } from './components/spot/list/listSpotsComponent';
import { LoginUserComponent } from './components/user/login/loginUserComponent';
import { LogoutUserComponent } from './components/user/logout/logoutUserComponent';
import { RegisterUserComponent } from './components/user/register/registerUserComponent';
import { RegisterUserSuccessComponent } from './components/user/registerSuccess/registerUserSuccessComponent';
import { VerifyUserComponent } from './components/user/verify/verifyUserComponent';
import { SearchAvailableSpotsComponent } from './components/spot/searchAvailable/searchAvailableSpotsComponent';
import { SearchAvailableSpotsResultsComponent } from './components/spot/searchAvailableResults/searchAvailableSpotsResultsComponent';
import { AboutRoutes } from './+about/index';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'spot/add', component: AddSpotComponent, canActivate: [LoggedInGuard] },
  { path: 'spot/list', component: ListSpotsComponent, canActivate: [LoggedInGuard] },
  { path: 'user/login', component: LoginUserComponent },
  { path: 'user/logout', component: LogoutUserComponent },
  { path: 'user/register', component: RegisterUserComponent },
  { path: 'user/register-success', component: RegisterUserSuccessComponent },
  { path: 'user/verify/:verificationToken', component: VerifyUserComponent },
  //{ path: 'spot/search-available', component: SearchAvailableSpotsComponent, canActivate: [LoggedInGuard] },
  { path: 'spot/search-available', component: SearchAvailableSpotsComponent },
  //{ path: 'spot/search-available-results', component: SearchAvailableSpotsResultsComponent, canActivate: [LoggedInGuard] },
  { path: 'spot/search-available-results', component: SearchAvailableSpotsResultsComponent },
  ...AboutRoutes
];
