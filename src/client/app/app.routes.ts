import { Routes } from '@angular/router';
import { LoggedInGuard } from './loggedInGuard';

import { HomeComponent } from './components/home/homeComponent';
import { ListConversationsComponent } from './components/conversation/list/listConversationsComponent';
import { ViewConversationComponent } from './components/conversation/view/viewConversationComponent';
import { ComposeMessageComponent } from './components/message/compose/composeMessageComponent';
import { ListSentMessagesComponent } from './components/message/listSent/listSentMessagesComponent';
import { ListReceivedMessagesComponent } from './components/message/listReceived/listReceivedMessagesComponent';
import { ReadMessageComponent } from './components/message/read/readMessageComponent';
import { AddSpotComponent } from './components/spot/add/addSpotComponent';
import { ListSpotsComponent } from './components/spot/list/listSpotsComponent';
import { ChangePasswordComponent } from './components/user/changePassword/changePasswordComponent';
import { EditUserComponent } from './components/user/edit/editUserComponent';
import { InitializePasswordResetComponent } from './components/user/initializePasswordReset/initializePasswordResetComponent';
import { LoginUserComponent } from './components/user/login/loginUserComponent';
import { LogoutUserComponent } from './components/user/logout/logoutUserComponent';
import { RegisterUserComponent } from './components/user/register/registerUserComponent';
import { RegisterUserSuccessComponent } from './components/user/registerSuccess/registerUserSuccessComponent';
import { ResetPasswordComponent } from './components/user/resetPassword/resetPasswordComponent';
import { VerifyUserComponent } from './components/user/verify/verifyUserComponent';
import { ViewUserComponent } from './components/user/view/viewUserComponent';
import { SearchSpotsComponent } from './components/spot/search/searchSpotsComponent';
import { SearchSpotsResultsComponent } from './components/spot/searchResults/searchSpotsResultsComponent';
import { AboutRoutes } from './+about/index';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'conversation/list', component: ListConversationsComponent, canActivate: [LoggedInGuard] },
  { path: 'conversation/view/:conversationId', component: ViewConversationComponent, canActivate: [LoggedInGuard] },
  { path: 'message/compose/:recipientId', component: ComposeMessageComponent, canActivate: [LoggedInGuard] },
  { path: 'message/reply/:messageId', component: ComposeMessageComponent, canActivate: [LoggedInGuard] },
  { path: 'message/list-sent/:page', component: ListSentMessagesComponent, canActivate: [LoggedInGuard] },
  { path: 'message/list-received/:page', component: ListReceivedMessagesComponent, canActivate: [LoggedInGuard] },
  { path: 'message/read/:messageId', component: ReadMessageComponent, canActivate: [LoggedInGuard] },
  { path: 'spot/add', component: AddSpotComponent, canActivate: [LoggedInGuard] },
  //{ path: 'spot/add', component: AddSpotComponent },
  { path: 'spot/list', component: ListSpotsComponent, canActivate: [LoggedInGuard] },
  //{ path: 'spot/list', component: ListSpotsComponent },
  { path: 'user/change-password', component: ChangePasswordComponent, canActivate: [LoggedInGuard] },
  { path: 'user/edit', component: EditUserComponent, canActivate: [LoggedInGuard] },
  { path: 'user/initialize-password-reset', component: InitializePasswordResetComponent },
  { path: 'user/login', component: LoginUserComponent },
  { path: 'user/logout', component: LogoutUserComponent },
  { path: 'user/register', component: RegisterUserComponent },
  { path: 'user/register-success', component: RegisterUserSuccessComponent },
  { path: 'user/reset-password/:passwordResetToken', component: ResetPasswordComponent },
  { path: 'user/view/:userId', component: ViewUserComponent, canActivate: [LoggedInGuard]  },
  { path: 'user/verify/:verificationToken', component: VerifyUserComponent },
  //{ path: 'spot/search/:bookedState', component: SearchSpotsComponent, canActivate: [LoggedInGuard] },
  { path: 'spot/search/:bookedState', component: SearchSpotsComponent },
  //{ path: 'spot/search-results', component: SearchSpotsResultsComponent, canActivate: [LoggedInGuard] },
  { path: 'spot/search-results', component: SearchSpotsResultsComponent },
  ...AboutRoutes
];
