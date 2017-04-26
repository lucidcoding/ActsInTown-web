import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ListSentMessagesViewModel } from './viewModels/listSentMessagesViewModel';
import { ListSentMessagesRowViewModel } from './viewModels/listSentMessagesRowViewModel';
import { MessageService } from '../../../services/message/messageService';
import { UserService } from '../../../services/user/user.service';
import { Message } from '../../../services/message/responses/messageResponse';
import { User } from '../../../services/user/responses/user';
import { ElementState } from '../../../common/elementState';
import '../../../common/arrayExtensions';
import '../../../common/dateExtensions';

@Component({
    moduleId: module.id,
    selector: 'sd-list-sent-messages',
    templateUrl: 'listSentMessagesComponent.html',
    styleUrls: ['listSentMessagesComponent.css']
})
export class ListSentMessagesComponent implements OnInit, OnDestroy {
    public viewModel: ListSentMessagesViewModel;
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

            this.messageService.getSentItems(this.viewModel.page, 10).subscribe(
                (response: Message[]) => {    
                    this.viewModel.rows = response.map((message: Message) => {    
                        //Angular2 date bug again?
                        let sentOnAny = <any>message.sentOn;
                        let sentOn = new Date(sentOnAny);

                        return {
                            id: message.id,
                            recipientFullName: message.recipient.fullName,
                            recipientImageUrl: message.recipient.imageUrl,
                            title: message.title,
                            sentOnString: sentOn.getFormattedString()
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
