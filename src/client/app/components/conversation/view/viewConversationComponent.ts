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
//import '../../../common/arrayExtensions';
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
            this.getNextMessages();

            var currentUser;

            this.userService.getForConversation(this.viewModel.id).subscribe(
                response => {
                    this.viewModel.otherUserName = response[0].fullName;
                },
                error => {
                    this.viewModel.elementState = ElementState.LoadingError;
                },
                () => {
                    //
                });
        });
        
        this.socketService.on('chatMessage', (message) => {
            let messageModelRow: ViewConversationMessageViewModel = {
                id: 'aa',
                imageUrl: '',
                fullName: 'test',
                addedOn: new Date().toString(),
                body: message.text,
                sentOk: true
            };
        
            this.viewModel.messages.push(messageModelRow);
            
            console.log('yay');
        });
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    scrollToBottom() {
        //try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        //} catch(err) { }                 
    }

    private mapMessage(message: Message): ViewConversationMessageViewModel {
        let messageModelRow: ViewConversationMessageViewModel = {
            id: message.id,
            imageUrl: message.user.imageUrl,
            fullName: message.user.fullName,
            addedOn: null,
            body: message.body,
            sentOk: true
        };
                    
        //This Angular2 bug again?
        let addedOnAny = <any>message.addedOn;
        let addedOn = new Date(addedOnAny);
        messageModelRow.addedOn = addedOn.getFormattedString();
        return messageModelRow;
    }

    private getNextMessages() {
        this.messageService.getForConversation(this.viewModel.id, this.viewModel.page, 10).subscribe(
            response => {
                this.viewModel.messages = response.reverse().map(this.mapMessage);

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
                    this.viewModel.messages.push(this.mapMessage(message));
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
