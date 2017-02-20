import {EnvConfig} from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  API: 'https://localhost:8443/ActsInTown-api/',
  MESSENGER_API: 'http://localhost:3010/'
};

export = DevConfig;

