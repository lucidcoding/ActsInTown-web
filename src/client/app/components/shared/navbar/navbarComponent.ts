import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { SocketService } from '../../../services/socket/socketService';
import { Message } from '../../../services/message/responses/messageResponse';
import 'rxjs/add/operator/filter';

/**
 * This class represents the navigation bar component.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-navbar',
    templateUrl: 'navbarComponent.html',
    styleUrls: ['navbarComponent.css'],
})

export class NavbarComponent {
    public authenticated: boolean;
    public newMessages: boolean;
    public isCollapsed: boolean;
    private sub: any;
    
    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private socketService: SocketService) {
        this.authenticated = this.authenticationService.isLoggedIn();
        this.isCollapsed = true;
        
        this.authenticationService.authenticatedStateChanged$.subscribe((isAuthenticated: boolean) => {
            this.authenticated = isAuthenticated;
        });
        
        this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((val) => {
                this.isCollapsed = true;
            });

        this.newMessages = false;
    }

    public ngOnInit() {
        this.socketService.on('UnreadMessages', (message: Message) => {
            if (this.router.url !== '/conversation/view/' + message.conversation) {
                this.newMessages = true;
            }
        });

        this.socketService.on('AllMessageRead', (message: Message) => {
            this.newMessages = false;
        });
    }
    
    ngOnDestroy() {
        this.socketService.removeListener('UnreadMessage');
        this.socketService.removeListener('AllMessageRead');
    }
}
