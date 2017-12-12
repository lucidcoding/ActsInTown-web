import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ListSentMessagesViewModel } from './viewModels/listSentMessagesViewModel';
import { MessageService } from '../../../services/message/messageService';
import { UserService } from '../../../services/user/user.service';
import { Message } from '../../../services/message/responses/messageResponse';
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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService,
        private userService: UserService) {

        this.viewModel = {
            rows: [],
            elementState: ElementState.Loading,
            page: 1,
            records: 0
        };
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.viewModel.page = parseInt(params['page']);

            Observable.forkJoin([
                this.messageService.getSentItems(this.viewModel.page, 10),
                this.messageService.getSentItemsCount()
            ]).subscribe((response: any[]) => { //Return proper types here and hereon.
                var sentItemsResponse: Message[] = response[0];
                var sentItemsCountResponse: number = response[1];

                this.viewModel.rows = sentItemsResponse.map((message: Message) => {
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

                this.viewModel.records = sentItemsCountResponse;

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
        this.router.navigate(['/message/list-sent/' + $event]);
    }
}
