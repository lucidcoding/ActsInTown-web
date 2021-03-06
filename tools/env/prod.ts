import {EnvConfig} from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  //API: 'http://api.actsintown.co.uk/'
  API: 'https://actsintown.co.uk:8443/ActsInTown-api/',
  MESSENGER_API: 'https://localhost:3010/'
};

export = ProdConfig;

