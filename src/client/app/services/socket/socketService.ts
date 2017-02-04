import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
//import * as io from "socket.io-client";

interface Window { io: any; }

//import { IMessage, ISocketItem } from "../../models";
@Injectable()
export class SocketService {
    //private name: string;
    //private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    private socket: any;

    constructor() {
    }

    connect() {
        //this.socket = io('http://localhost:3000');
        var your_jwt = localStorage.getItem('accessToken');

        this.socket = io.connect('http://localhost:3010', {
            'query': 'token=' + your_jwt
        });

        this.socket.on('connect', () => {
            console.log('Connected on socket: ' + this.socket.id);
        });

        this.socket.on('heartbeat', function (data: any) {
            console.log('Socket heartbeat');
        });
    }

    // Wrap the Socket.io 'on' method
    on(eventName: string, callback: Function) {
        if (this.socket) {
            this.socket.on(eventName, function (data: any) {
                callback(data);
            });
        }
    }

    // Wrap the Socket.io 'emit' method
    emit(eventName: string, data: Function) {
        if (this.socket) {
            this.socket.emit(eventName, data);
        }
    }

    // Wrap the Socket.io 'removeListener' method
    removeListener(eventName: string) {
        if (this.socket) {
            this.socket.removeListener(eventName);
        }
    };
}

/*
@Injectable()
export class SocketService {
    private name: string;
    private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    socket: SocketIOClient.Socket;

    constructor() {}

    // Get items observable
    get(name: string): Observable<any> {
        this.name = name;
        let socketUrl = this.host + "/" + this.name;
        this.socket = connect(socketUrl);
        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });

        // Return observable which follows "create" and "remove" signals from socket stream
        return Observable.create((observer: any) => {
            this.socket.on("create", (item: any) => observer.next({ action: "create", item: item }) );
            this.socket.on("remove", (item: any) => observer.next({ action: "remove", item: item }) );
            return () => this.socket.close();
        });
    }

    // Create signal
    create(name: string) {
        this.socket.emit("create", name);
    }

    // Remove signal
    remove(name: string) {
        this.socket.emit("remove", name);
    }

    // Handle connection opening
    private connect() {
        console.log(`Connected to "${this.name}"`);

        // Request initial list when connected
        this.socket.emit("list");
    }

    // Handle connection closing
    private disconnect() {
        console.log(`Disconnected from "${this.name}"`);
    }
}
*/



/*
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { ConfigService } from '../config/config.service';
import { Message } from './responses/messageResponse';
import { CreateMessageRequest } from './requests/createMessageRequest';

@Injectable()
export class SocketServiceService {
    private socket: any;
    
	constructor() {
        this.socket = io();
	}

    getForConversation(conversationId: string, page: number, pageSize: number): Observable<Message[]> {
        return this.http.get(this.configService.getApiBaseUrl() + 'message/for-conversation/' + conversationId + '/' + page + '/' + pageSize)
        	.map(response => response.json());
    }
    
    createMessage(createMessageRequest: CreateMessageRequest): Observable<Response> {
		return this.http.post(this.configService.getApiBaseUrl() + 'message', createMessageRequest, null);
    }
}
*/