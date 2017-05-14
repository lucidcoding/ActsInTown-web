import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReadMessageViewModel } from './viewModels/readMessageViewModel';
import { MessageService } from '../../../services/message/messageService';
import { UserService } from '../../../services/user/user.service';
import { Message } from '../../../services/message/responses/messageResponse';
import { User } from '../../../services/user/responses/user';
import { ElementState } from '../../../common/elementState';
import '../../../common/arrayExtensions';
import '../../../common/dateExtensions';

@Component({
    moduleId: module.id,
    selector: 'sd-read-message',
    templateUrl: 'readMessageComponent.html',
    styleUrls: ['readMessageComponent.css']
})
export class ReadMessageComponent implements OnInit, OnDestroy {
    public viewModel: ReadMessageViewModel;
    private sub: any;

    constructor(private route: ActivatedRoute,
                private messageService: MessageService,
                private userService: UserService) {

        this.viewModel = {
            messageId: null,
            senderFullName: null,
            senderImageUrl: null,
            title: null,
            sentOnString: null,
            body: null,
            elementState: ElementState.Loading,
            previousMessages: []
        };
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.viewModel.messageId = params['messageId'];

            this.messageService
                .get(this.viewModel.messageId)
                .flatMap((getMessageResponse: Message) => {
                    //Angular2 date bug again?
                    let sentOnAny = <any>getMessageResponse.sentOn;
                    let sentOn = new Date(sentOnAny);

                    this.viewModel.senderFullName = getMessageResponse.sender.fullName;
                    this.viewModel.title = getMessageResponse.title;
                    this.viewModel.sentOnString = sentOn.getFormattedString();
                    this.viewModel.senderImageUrl = getMessageResponse.sender.imageUrl;
                    this.viewModel.body = getMessageResponse.body;
                    this.viewModel.elementState = ElementState.Ready;
                    
                    return this.messageService.getForConversation(getMessageResponse.conversation.id, sentOn, 1, 10);
                })
                .subscribe((getForConversationResponse: Message[]) => {
                    this.viewModel.previousMessages = getForConversationResponse.map((message: Message) => {
                        //Angular2 date bug again?
                        let sentOnAny = <any>message.sentOn;
                        let sentOn = new Date(sentOnAny);

                        return {
                            messageId: message.id,
                            senderFullName: message.sender.fullName,
                            title: message.title,
                            sentOnString: sentOn.getFormattedString(),
                            body: message.body
                        };
                    });
                }, error => {
                    this.viewModel.elementState = ElementState.LoadingError;
                });
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
