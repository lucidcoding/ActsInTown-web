import { Injectable } from '@angular/core';
import { Config } from '../../shared/config/env.config';

@Injectable()
export class ConfigService {
	getApiBaseUrl(): string {
		//return 'https://localhost:8443/ActsInTown-api/';
		//return 'http://api.actsintown.co.uk/';
        return Config.API;
	}
	getMessengerApiBaseUrl(): string {
        return Config.MESSENGER_API;
	}
} 
