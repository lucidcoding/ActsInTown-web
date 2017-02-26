import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewUserViewModel } from './viewUserViewModel';
import { ConversationService } from '../../../services/conversation/conversationService';
import { UserService } from '../../../services/user/user.service';
import { ElementState } from '../../../common/elementState';

@Component({
    moduleId: module.id,
    selector: 'sd-view-user',
    templateUrl: 'viewUserComponent.html',
    styleUrls: ['viewUserComponent.css']
})
export class ViewUserComponent implements OnInit, OnDestroy {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    public viewModel: ViewUserViewModel;
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private conversationService: ConversationService,
        private userService: UserService,
        private router: Router) {
        this.viewModel = {
            id: null,
            fullName: null,
            elementState: ElementState.Loading
        };
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.viewModel.id = params['userId'];

            this.userService.getByIds([
                this.viewModel.id
            ]).subscribe(
                response => {
                    this.viewModel.fullName = response[0].fullName;
                    this.viewModel.elementState = ElementState.Ready;
                },
                error => {
                    this.viewModel.elementState = ElementState.LoadingError;
                },
                () => {
                    //
                });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public messageUser(event: any) { //event is MouseEvent but can't find what package that is in!
        event.preventDefault();
        
        this.conversationService.getForCurrentUserAndUser(this.viewModel.id).subscribe(
            response => {
                if (response !== null) {
                    this.router.navigate(['conversation/view/' + response.entity._id]);
                } else {
                    this.conversationService.start({
                        usersToIds: [ this.viewModel.id ]
                    }).subscribe(
                        response => {
                            this.router.navigate(['conversation/view/' + response.entity._id]);
                        },
                        error => {
                            this.viewModel.elementState = ElementState.LoadingError;
                        },
                        () => {
                            //
                        });
                }
            },
            error => {
                this.viewModel.elementState = ElementState.LoadingError;
            },
            () => {
                //
            });
    }
}
