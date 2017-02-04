import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewConversationViewModel } from './viewModels/viewConversationViewModel';
import { ViewConversationMessageViewModel } from './viewModels/viewConversationMessageViewModel';
import { MessageService } from '../../../services/message/messageService';
import { SocketService } from '../../../services/socket/socketService';
import { UserService } from '../../../services/user/user.service';
import { Message } from '../../../services/message/responses/messageResponse';
import { User } from '../../../services/user/responses/user';
import { ElementState } from '../../../common/elementState';
import { CreateMessageRequest } from '../../../services/message/requests/createMessageRequest';
import '../../../common/arrayExtensions';
import '../../../common/dateExtensions';

@Component({
    moduleId: module.id,
    selector: 'sd-view-conversation',
    templateUrl: 'viewConversationComponent.html',
    styleUrls: ['viewConversationComponent.css']
})
export class ViewConversationComponent implements AfterViewChecked, OnInit, OnDestroy {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    public viewModel: ViewConversationViewModel;
    private users: User[];
    private sub: any;

    constructor(private route: ActivatedRoute,
        private messageService: MessageService,
        private socketService: SocketService,
        private userService: UserService) {
        this.viewModel = {
            id: null,
            otherUserName: null,
            messages: [],
            newMessageBody: null,
            elementState: ElementState.Loading,
            page: 1
        };
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.viewModel.id = params['conversationId'];

            var currentUser;

            this.userService.getByIds([
                'ccd93a3a-5737-43a0-848c-5f6332067735',
                '01d67a77-74dd-4853-99b6-5a5114f5b062'
            ]).subscribe(
                response => {
                    this.users = response;
                    this.getNextMessages();
                },
                error => {
                    this.viewModel.elementState = ElementState.LoadingError;
                },
                () => {
                    //
                });
        });

        this.socketService.connect();
        
        this.socketService.on('MessageAdded', (message: Message) => {
            /*let messageModelRow: ViewConversationMessageViewModel = {
                id: message._id,
                imageUrl: '',
                fullName: 'test',
                addedOn: new Date().toString(),
                body: message.body,
                sentOk: true
            };*/

            let messageModelRow: ViewConversationMessageViewModel = this.mapMessage(message, this.users);
            this.viewModel.messages.push(messageModelRow);
            console.log('Message received: ' + JSON.stringify(message));
        });
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.socketService.removeListener('MessageAdded');
    }

    scrollToBottom() {
        //try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        //} catch(err) { }                 
    }

    private mapMessage(message: Message, users: User[]): ViewConversationMessageViewModel {
        let user = users.single((item: User) => {
            return item.id.toLowerCase() === message.userId.toLowerCase();
        });

        //Seems to be some sort of bug in Angular2 which means I have to do this?
        //let addedOn = message.addedOn.getFormattedString();
        let addedOn = new Date(<any>message.addedOn).getFormattedString();

        let messageModelRow: ViewConversationMessageViewModel = {
            id: message._id,
            imageUrl: user.imageUrl,
            fullName: user.fullName,
            addedOn: addedOn,
            body: message.body,
            sentOk: true
        };
                    
        return messageModelRow;
    }

    private getNextMessages() {
        this.messageService.getForConversation(this.viewModel.id, this.viewModel.page, 10).subscribe(
            response => {
                this.viewModel.messages = response.reverse().map((message: Message) => {
                    return this.mapMessage(message, this.users);
                });

                if (this.viewModel.messages.length > 0) {
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

    public createMessage(createMessageForm: any) {
        if (!createMessageForm.valid) {
            return;
        }

        var createMessageRequest: CreateMessageRequest = {
            conversationId: this.viewModel.id,
            body: this.viewModel.newMessageBody
        };

        this.messageService.createMessage(createMessageRequest).subscribe(
            (response: any) => {
                if (response.status === 201) {
                    var message: Message = JSON.parse(response._body);
                    this.viewModel.messages.push(this.mapMessage(message, this.users));
                }
                //this.getNextMessages();
                //this.scrollToBottom(); 
            },
            error => {
                this.viewModel.elementState = ElementState.LoadingError;
            },
            () => {
                //
            });
    }
}
