import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComposeMessageViewModel } from './composeMessageViewModel';
import { MessageService } from '../../../services/message/messageService';
import { UserService } from '../../../services/user/user.service';
import { SendMessageRequest } from '../../../services/message/requests/sendMessageRequest';
import { ReplyToMessageRequest } from '../../../services/message/requests/replyToMessageRequest';
import { Message } from '../../../services/message/responses/messageResponse';
import { User } from '../../../services/user/responses/user';
import { Option } from '../../../common/option.common';
import { ElementState } from '../../../common/elementState';
import '../../../common/dateExtensions';

@Component({
    moduleId: module.id,
    selector: 'sd-compose-message',
    templateUrl: 'composeMessageComponent.html',
    styleUrls: ['composeMessageComponent.css']
})
export class ComposeMessageComponent implements OnInit, OnDestroy {
    public viewModel: ComposeMessageViewModel;
    private sub: any;

    constructor(
                private route: ActivatedRoute,
                private messageService: MessageService,
                private userService: UserService,
                private router: Router) {
        this.viewModel = {
            recipientId: null,
            recipientName: null,
            recipientImageUrl: null,
            title: null,
            body: null,
            replyToMessageId: null,
            elementState: ElementState.Loading
        };
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (this.router.url.startsWith("/messages/compose/")) {
                this.viewModel.recipientId = params['recipientId'];

                this.userService.getByIds([
                    this.viewModel.recipientId
                ]).subscribe(
                    (response: User[]) => {
                        this.viewModel.recipientName = response[0].fullName;
                        this.viewModel.recipientImageUrl = response[0].imageUrl;
                        this.viewModel.elementState = ElementState.Ready;
                    },
                    error => {
                        this.viewModel.elementState = ElementState.LoadingError;
                    },
                    () => {
                        //
                    });
            } else {
                this.viewModel.replyToMessageId = params['messageId'];

                this.messageService.get(this.viewModel.replyToMessageId).subscribe(
                    (response: Message) => {
                        this.viewModel.recipientName = response.sender.fullName;
                        this.viewModel.recipientImageUrl = response.sender.imageUrl;
                        this.viewModel.elementState = ElementState.Ready;
                    },
                    error => {
                        this.viewModel.elementState = ElementState.LoadingError;
                    },
                    () => {
                        //
                    });               
            }
        });     
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSubmit(composeMessageForm: any) {
        if (!composeMessageForm.valid) {
            return;
        }

        this.viewModel.elementState = ElementState.Loading;


        if(this.viewModel.replyToMessageId !== null) {
            var replyToMessageRequest: ReplyToMessageRequest = {
                originalMessageId: this.viewModel.replyToMessageId,
                body: this.viewModel.body
            };

            this.messageService.replyToMessage(replyToMessageRequest).subscribe(
                response => {
                    this.viewModel.elementState = ElementState.Ready;
                    this.router.navigate(['message/list-received/1']);
                },
                error => {
                    this.viewModel.elementState = ElementState.SubmissionError;
                }
            );
        } else {
            var sendMessageRequest: SendMessageRequest = {
                recipientId: this.viewModel.recipientId,
                title: this.viewModel.title,
                body: this.viewModel.body
            };

            this.messageService.sendMessage(sendMessageRequest).subscribe(
                response => {
                    this.viewModel.elementState = ElementState.Ready;
                    this.router.navigate(['message/list-received/1']);
                },
                error => {
                    this.viewModel.elementState = ElementState.SubmissionError;
                }
            );
        }
    }
}
