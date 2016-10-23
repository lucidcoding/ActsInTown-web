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
    public verificationSuccessful: boolean;
    private sub: any;
     
    constructor(private route: ActivatedRoute,
                private userService: UserService) {
        this.verificationSuccessful = null;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.userService.verify(params['verificationToken']).subscribe(
                response => {
                    this.verificationSuccessful = true;
                },
                error => {
                    this.verificationSuccessful = false;
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
