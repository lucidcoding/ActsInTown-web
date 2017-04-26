import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReadMessageViewModel } from './readMessageViewModel';
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
            elementState: ElementState.Loading
        };
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.viewModel.messageId = params['messageId'];

            this.messageService.get(this.viewModel.messageId).subscribe(
                (response: Message) => {
                    //Angular2 date bug again?
                    let sentOnAny = <any>response.sentOn;
                    let sentOn = new Date(sentOnAny);

                    this.viewModel.senderFullName = response.sender.fullName;
                    this.viewModel.title = response.title;
                    this.viewModel.sentOnString = sentOn.getFormattedString();
                    this.viewModel.senderImageUrl = response.sender.imageUrl;
                    this.viewModel.body = response.body;
                    this.viewModel.elementState = ElementState.Ready;
                },
                error => {
                    this.viewModel.elementState = ElementState.LoadingError;
                });
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
