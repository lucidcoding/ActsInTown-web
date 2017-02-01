import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { ConfigService } from '../config/config.service';
import { Message } from './responses/messageResponse';
import { CreateMessageRequest } from './requests/createMessageRequest';

@Injectable()
export class MessageService {
	constructor(
		private http: CustomHttpService,
		private configService: ConfigService) {
	}

    getForConversation(conversationId: string, page: number, pageSize: number): Observable<Message[]> {
        return this.http.get('http://localhost:3010/' + 'message/for-conversation/' + conversationId + '/' + page + '/' + pageSize)
        	.map(response => response.json());
    }
    
    createMessage(createMessageRequest: CreateMessageRequest): Observable<Response> {
		return this.http.post('http://localhost:3010/' + 'message', createMessageRequest, null);
    }
}
