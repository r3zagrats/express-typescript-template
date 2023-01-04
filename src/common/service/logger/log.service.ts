/* eslint-disable @typescript-eslint/no-shadow */
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import eventEmitter from '../../events/errorEmitter';

const { combine, timestamp, colorize, printf } = winston.format;

class LogService {
  stream = {
    write: (message: string) => this.http(message),
  };

  #fileConfig = new DailyRotateFile({
    level: 'http',
    filename: '%DATE%',
    extension: '.log',
    dirname: 'log',
    format: printf(({ label, timestamp, message }) =>
      `${label} : ${timestamp} : ${message}`.trimEnd()
    ),
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    maxSize: '20m',
  });

  #customFormat = combine(
    timestamp({
      format: 'DD-MM-YYYY : HH:mm:ss',
    }),
    printf(({ label, timestamp, message }) => `${label} : ${timestamp} : ${message} \n`)
  );

  #logger = winston.createLogger({
    level: 'debug',
    format: this.#customFormat,
    transports: [
      this.#fileConfig,
      new winston.transports.Console({
        format: combine(
          colorize({
            all: true,
          })
        ),
      }),
    ],
  });

  log(message: any, label = 'INFO') {
    const msg = typeof message === 'string' ? message : JSON.stringify(message);
    this.#logger.info(msg, { label: `[${label.toUpperCase()}]` });
  }

  http(message: string, label = 'HTTP') {
    this.#logger.http(message, { label: `[${label.toUpperCase()}]` });
  }

  debug(message: any, label = 'DEBUG') {
    const msg = typeof message === 'string' ? message : JSON.stringify(message);
    this.#logger.debug(msg, { label: `[${label.toUpperCase()}]` });
  }

  error(err: Error, label = 'ERROR') {
    this.#logger.error(err.message, { label: `[${label.toUpperCase()}]` });
    eventEmitter.emit('error', err.message);
  }
}

export default LogService;
