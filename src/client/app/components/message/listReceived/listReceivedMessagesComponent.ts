import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        private router: Router,
        private messageService: MessageService,
        private userService: UserService) {

        this.viewModel = {
            rows: [],
            elementState: ElementState.Loading,
            page: 1,
            records: 0,
        };
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.viewModel.page = parseInt(params['page']);

            Observable.forkJoin([
                this.messageService.getInbox(this.viewModel.page, 10),
                this.messageService.getInboxCount()
            ]).subscribe((response: any[]) => { //Return proper types here and hereon.
                var inboxResponse = response[0];
                var inboxCountResponse = response[1];

                this.viewModel.rows = inboxResponse.map((message: Message) => {
                    //Angular2 date bug again?
                    let sentOnAny = <any>message.sentOn;
                    let sentOn = new Date(sentOnAny);

                    return {
                        id: message.id,
                        senderFullName: message.sender.fullName,
                        senderImageUrl: message.recipient.imageUrl,
                        title: message.title,
                        sentOnString: sentOn.getFormattedString(),
                        read: message.read
                    };
                });


                this.viewModel.records = inboxCountResponse;


                if (this.viewModel.rows.length > 0) {
                    this.viewModel.elementState = ElementState.Ready;
                } else {
                    this.viewModel.elementState = ElementState.NoData;
                }
            });
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    pageSelected($event: any) {
        this.router.navigate(['/message/list-received/' + $event]);
    }
}
