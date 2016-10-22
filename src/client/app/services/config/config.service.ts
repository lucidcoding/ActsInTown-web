import { Injectable, OpaqueToken } from '@angular/core';
import { IConfigService } from './iconfig.service';

@Injectable()
export class ConfigService implements IConfigService {
	getApiBaseUrl(): string {
		return 'https://localhost:8443/ActsInTown-api/';
	}
}

export let ConfigServiceToken = new OpaqueToken('ConfigServiceToken');
