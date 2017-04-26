import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { ConfigService } from '../config/config.service';
import { Message } from './responses/messageResponse';
import { SendMessageRequest } from './requests/sendMessageRequest';

@Injectable()
export class MessageService {
	constructor(
		private http: CustomHttpService,
		private configService: ConfigService) {
	}

    get(id: string): Observable<Message> {
        return this.http.get(this.configService.getApiBaseUrl() + 'message/' + id)
        	.map(response => response.json());
    }

    getInbox(page: number, pageSize: number): Observable<Message[]> {
        return this.http.get(this.configService.getApiBaseUrl() + 'message/inbox/' + page + '/' + pageSize)
        	.map(response => response.json());
    }

    getInboxCount(): Observable<number> {
        return this.http.get(this.configService.getApiBaseUrl() + 'message/inbox/count')
        	.map(response => response.json());
    }

    getSentItems(page: number, pageSize: number): Observable<Message[]> {
        return this.http.get(this.configService.getApiBaseUrl() + 'message/sent-items/' + page + '/' + pageSize)
        	.map(response => response.json());
    }

    getSentItemsCount(): Observable<number> {
        return this.http.get(this.configService.getApiBaseUrl() + 'message/sent-items/count')
        	.map(response => response.json());
    }

    sendMessage(sendMessageRequest: SendMessageRequest): Observable<Response> {
		return this.http.post(this.configService.getApiBaseUrl() + 'message', sendMessageRequest, null);
    }
}
