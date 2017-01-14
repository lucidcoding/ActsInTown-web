import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewConversationViewModel } from './viewModels/viewConversationViewModel';
import { ViewConversationMessageViewModel } from './viewModels/viewConversationMessageViewModel';
import { MessageService } from '../../../services/message/messageService';
import { Message } from '../../../services/message/responses/messageResponse';
import { ElementState } from '../../../common/elementState';
import { CreateMessageRequest } from '../../../services/message/requests/createMessageRequest';
import '../../../common/dateExtensions';

@Component({
    moduleId: module.id,
    selector: 'sd-view-conversation',
    templateUrl: 'viewConversationComponent.html',
    styleUrls: ['viewConversationComponent.css']
})
export class ViewConversationComponent implements OnInit, OnDestroy {
    public viewModel: ViewConversationViewModel;
    private sub: any;

    constructor(private route: ActivatedRoute,
                private messageService: MessageService) {
        this.viewModel = {
            id: null,
            userNames: null,
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
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private getNextMessages() {
        this.messageService.getForConversation(this.viewModel.id, this.viewModel.page, 10).subscribe(
            response => {
                this.viewModel.messages = response.map((message: Message) => {
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
                    
                    //Seems to be some sort of bug in Angular2 which means I have to do this?
                    /*let addedOnAny = <any>message.addedOn;
                    let addedOn = new Date(addedOnAny);

                    viewModelRow.dateTimeHeading =
                        padLeft(scheduledFor.getDate()) + ' ' +
                        scheduledFor.getShortMonthString() + ' ' +
                        scheduledFor.getFullYear() + ' ' +
                        padLeft(scheduledFor.getHours()) + ':' +
                        padLeft(scheduledFor.getMinutes());*/

                    return messageModelRow;
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
            response => {
                this.getNextMessages();
            },
            error => {
                this.viewModel.elementState = ElementState.LoadingError;
            },
            () => {
                //
            });    
    }
}
