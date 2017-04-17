import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ListConversationsViewModel } from './viewModels/listConversationsViewModel';
import { ListConversationsRowViewModel } from './viewModels/listConversationsRowViewModel';
import { ConversationService } from '../../../services/conversation/conversationService';
import { MessageService } from '../../../services/message/messageService';
import { UserService } from '../../../services/user/user.service';
import { Conversation } from '../../../services/conversation/responses/conversationResponse';
import { User } from '../../../services/user/responses/user';
import { ElementState } from '../../../common/elementState';
import { CreateMessageRequest } from '../../../services/message/requests/createMessageRequest';
import '../../../common/arrayExtensions';
import '../../../common/dateExtensions';

@Component({
    moduleId: module.id,
    selector: 'sd-list-conversations',
    templateUrl: 'listConversationsComponent.html',
    styleUrls: ['listConversationsComponent.css']
})
export class ListConversationsComponent implements OnInit {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    public viewModel: ListConversationsViewModel;
    private currentUser: User;

    constructor(private route: ActivatedRoute,
        private conversationService: ConversationService,
        private messageService: MessageService,
        private userService: UserService) {

        this.viewModel = {
            rows: [],
            elementState: ElementState.Loading,
            page: 1
        };
    }

    public ngOnInit() {
        this.userService.getCurrent().subscribe(
            (response: User) => {
                this.currentUser = response;      
                this.getNextConversations();
            },
            error => {
                this.viewModel.elementState = ElementState.LoadingError;
            });
    }

    private mapConversation(conversation: Conversation, users: User[]): ListConversationsRowViewModel {
        let otherUser = users.find((currentUser: User) => {
            return currentUser.id === conversation.otherUserIds[0];
        });

        let rowViewModel: ListConversationsRowViewModel = {
            id: conversation.entity._id,
            otherUserName: otherUser.fullName,
            otherUserImageUrl: otherUser.imageUrl
        };

        return rowViewModel;
    }

    private getNextConversations() {
        /*Observable.forkJoin([
            this.conversationService.getForCurrentUser(this.viewModel.page, 10),
            this.userService.getByIds(userIds)]).subscribe((response: Observable<any>[]) => {
                var conversationResponse = response[0];
                var usersResponse = response[1];
            });*/
        let conversationResponse: Conversation[] = [];

        this.conversationService.getForCurrentUser(this.viewModel.page, 10).flatMap((response: Conversation[]) => {
            conversationResponse = response;
            let userIds: string[] = [];

            conversationResponse.forEach((currentConversation: Conversation) => {
                currentConversation.entity.users.forEach((currentUser: any) => {
                    if (userIds.indexOf(currentUser.userId) === -1) {
                        userIds.push(currentUser.userId);
                    }
                });
            });

            return this.userService.getByIds(userIds);
        }).subscribe((response: User[]) => {
            this.viewModel.rows = conversationResponse.reverse().map((conversation: Conversation) => {
                return this.mapConversation(conversation, response);
            });

            if (this.viewModel.rows.length > 0) {
                this.viewModel.elementState = ElementState.Ready;
            } else {
                this.viewModel.elementState = ElementState.NoData;
            }
        }, error => {
            this.viewModel.elementState = ElementState.LoadingError;
        });
    }
}
