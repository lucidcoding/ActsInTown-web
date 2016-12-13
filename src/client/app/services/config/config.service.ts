import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
	getApiBaseUrl(): string {
		return 'https://localhost:8443/ActsInTown-api/';
		//return 'http://api.actsintown.co.uk/';
	}
} 
