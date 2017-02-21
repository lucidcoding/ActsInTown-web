import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListConversationsViewModel } from './viewModels/listConversationsViewModel';
import { ListConversationsRowViewModel } from './viewModels/listConversationsRowViewModel';
import { ConversationService } from '../../../services/conversation/conversationService';
import { MessageService } from '../../../services/message/messageService';
import { SocketService } from '../../../services/socket/socketService';
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
export class ListConversationsComponent implements OnInit, OnDestroy {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    public viewModel: ListConversationsViewModel;
    private currentUser: User;

    constructor(private route: ActivatedRoute,
        private conversationService: ConversationService,
        private messageService: MessageService,
        private socketService: SocketService,
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

    ngOnDestroy() {
        this.socketService.removeListener('MessageAdded');
    }

    private mapConversation(conversation: Conversation, users: User[]): ListConversationsRowViewModel {
        let otherConversationUser: any = conversation.users.find((currentUser: any) => {
            return currentUser.userId.toLowerCase() !== this.currentUser.id.toLowerCase();
        });

        let otherUser = users.find((currentUser: User) => {
            return currentUser.id === otherConversationUser.userId;
        });

        let rowViewModel: ListConversationsRowViewModel = {
            id: conversation._id,
            otherUserName: otherUser.fullName,
            otherUserImageUrl: otherUser.imageUrl
        };

        return rowViewModel;
    }

    private getNextConversations() {
        this.conversationService.getForCurrentUser(this.viewModel.page, 10).subscribe(
            (conversationResponse: Conversation[]) => {
                let userIds: string[] = [];

                conversationResponse.forEach((currentConversation: Conversation) => {
                    currentConversation.users.forEach((currentUser: any) => {
                        if (userIds.indexOf(currentUser.userId) === -1) {
                            userIds.push(currentUser.userId);
                        }
                    });
                });

                this.userService.getByIds(userIds).subscribe(
                    (usersResponse: User[]) => {
                        this.viewModel.rows = conversationResponse.reverse().map((conversation: Conversation) => {
                            return this.mapConversation(conversation, usersResponse);
                        });

                        if (this.viewModel.rows.length > 0) {
                            this.viewModel.elementState = ElementState.Ready;
                        } else {
                            this.viewModel.elementState = ElementState.NoData;
                        }
                    },
                    error => {
                        this.viewModel.elementState = ElementState.LoadingError;
                    });
            },
            error => {
                this.viewModel.elementState = ElementState.LoadingError;
            });
    }
}
