import { Injectable, OpaqueToken } from '@angular/core';

@Injectable()
export class ConfigService {
	getApiBaseUrl(): string {
		return 'https://localhost:8443/ActsInTown-api/';
	}
}
