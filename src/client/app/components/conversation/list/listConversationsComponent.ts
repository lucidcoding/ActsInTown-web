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
    private users: User[];

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
        this.userService.getByIds([
            'ccd93a3a-5737-43a0-848c-5f6332067735',
            '01d67a77-74dd-4853-99b6-5a5114f5b062'
        ]).subscribe(
            response => {
                this.users = response;
                this.getNextConversations();
            },
            error => {
                this.viewModel.elementState = ElementState.LoadingError;
            },
            () => {
                //
            });
    }

    ngOnDestroy() {
        this.socketService.removeListener('MessageAdded');
    }

    private mapConversation(conversation: Conversation, users: User[]): ListConversationsRowViewModel {
        /*let user = users.single((item: User) => {
            return item.id.toLowerCase() === conversation.userId.toLowerCase();
        });*/

        //Seems to be some sort of bug in Angular2 which means I have to do this?
        //let addedOn = new Date(<any>message.addedOn).getFormattedString();

        let rowViewModel: ListConversationsRowViewModel = {
            id: conversation._id,
            otherUserName: 'TEST',
            otherUserImageUrl: ''
        };

        return rowViewModel;
    }

    private getNextConversations() {
        this.conversationService.getForCurrentUser(this.viewModel.page, 10).subscribe(
            response => {
                this.viewModel.rows = response.reverse().map((conversation: Conversation) => {
                    return this.mapConversation(conversation, this.users);
                });

                if (this.viewModel.rows.length > 0) {
                    this.viewModel.elementState = ElementState.Ready;
                } else {
                    this.viewModel.elementState = ElementState.NoData;
                }
            },
            error => {
                this.viewModel.elementState = ElementState.LoadingError;
            },
            () => {
                //
            });
    }
}
