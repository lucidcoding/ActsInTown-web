import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ListReceivedMessagesViewModel } from './viewModels/listReceivedMessagesViewModel';
import { ListReceivedMessagesRowViewModel } from './viewModels/listReceivedMessagesRowViewModel';
import { MessageService } from '../../../services/message/messageService';
import { UserService } from '../../../services/user/user.service';
import { Message } from '../../../services/message/responses/messageResponse';
import { User } from '../../../services/user/responses/user';
import { ElementState } from '../../../common/elementState';
import '../../../common/arrayExtensions';
import '../../../common/dateExtensions';

@Component({
    moduleId: module.id,
    selector: 'sd-list-received-messages',
    templateUrl: 'listReceivedMessagesComponent.html',
    styleUrls: ['listReceivedMessagesComponent.css']
})
export class ListReceivedMessagesComponent implements OnInit, OnDestroy {
    public viewModel: ListReceivedMessagesViewModel;
    private sub: any;

    constructor(private route: ActivatedRoute,
                private messageService: MessageService,
                private userService: UserService) {

        this.viewModel = {
            rows: [],
            elementState: ElementState.Loading,
            page: 1
        };
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.viewModel.page = params['page'];

            this.messageService.getInbox(this.viewModel.page, 10).subscribe(
                (response: Message[]) => {
                    this.viewModel.rows = response.map((message: Message) => {
                        return {
                            id: message.id,
                            senderFullName: message.recipient.fullName,
                            senderImageUrl: message.recipient.imageUrl,
                            title: message.title,
                            sentOn: message.sentOn,
                            read: message.read
                        };
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
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
