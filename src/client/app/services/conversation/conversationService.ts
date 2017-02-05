import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { ConfigService } from '../config/config.service';
import { Conversation } from './responses/conversationResponse';

@Injectable()
export class ConversationService {
	constructor(
		private http: CustomHttpService,
		private configService: ConfigService) {
	}

    getForCurrentUser(page: number, pageSize: number): Observable<Conversation[]> {
        return this.http.get('http://localhost:3010/' + 'conversation/for-current-user/' + page + '/' + pageSize)
        	.map(response => response.json());
    }
}
