/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import ConfigService from '../service/config/config.service';
import LogService from '../service/logger/log.service';

declare global {
  var Logger: LogService;
  var Config: ConfigService;
}

export {};
