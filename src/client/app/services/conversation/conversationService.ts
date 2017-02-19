import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { ConfigService } from '../config/config.service';
import { Conversation } from './responses/conversationResponse';
import { StartConversationRequest } from './requests/startConversationRequest';

@Injectable()
export class ConversationService {
	constructor(
		private http: CustomHttpService,
		private configService: ConfigService) {
	}

	get(id: string): Observable<Conversation> {
        return this.http.get('http://localhost:3010/' + 'conversation/' + id)
        	.map(response => response.json());
	}

    getForCurrentUser(page: number, pageSize: number): Observable<Conversation[]> {
        return this.http.get('http://localhost:3010/' + 'conversation/for-current-user/' + page + '/' + pageSize)
        	.map(response => response.json());
    }

	getForCurrentUserAndUser(userId: string): Observable<Conversation> {
        return this.http.get('http://localhost:3010/' + 'conversation/for-current-user-and-user/' + userId)
        	.map(response => response.json());
    }

	start(request: StartConversationRequest): Observable<Conversation> {
		return this.http.post('http://localhost:3010/' + 'conversation', request, null)
        	.map(response => response.json());
	}
}
