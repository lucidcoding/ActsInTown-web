import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
    moduleId: module.id,
    selector: 'sd-verify-user',
    templateUrl: 'verifyUserComponent.html',
    styleUrls: ['verifyUserComponent.css']
})
export class VerifyUserComponent implements OnInit, OnDestroy {
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService) {
        //
    }

    getSomeStuff() {
        return 'From method';
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.userService.verify(params['verificationToken'])
                .subscribe(
                response => {
                    console.log('OK ' + response);
                },
                error => {
                    console.error('Error: ' + error);
                },
                () => {
                    //Do nothing.
                });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

//http://www.baeldung.com/registration-verify-user-by-email
