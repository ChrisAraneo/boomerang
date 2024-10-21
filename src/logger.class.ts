import {
  createLogger,
  format,
  Logger as WinstonLogger,
  transports,
} from 'winston';
const { combine, timestamp, printf, colorize, prettyPrint, simple } = format;

export class Logger {
  private logger: WinstonLogger;

  constructor(private logLevel = 'info') {
    this.initialize();
  }

  debug(message: string, ...meta: (object | unknown)[]): void {
    this.logger.debug(message, ...meta);
  }

  info(message: string, ...meta: (object | unknown)[]): void {
    this.logger.info(message, ...meta);
  }

  warn(message: string, ...meta: (object | unknown)[]): void {
    this.logger.warn(message, ...meta);
  }

  error(message: string, ...meta: (object | unknown)[]): void {
    this.logger.error(message, ...meta);
  }

  setLogLevel(logLevel = 'info'): void {
    this.logLevel = logLevel;
    this.initialize();
  }

  private initialize(): void {
    this.logger = createLogger({
      level: this.logLevel,
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:MM:SS',
        }),
        prettyPrint(),
        format.splat(),
        simple(),
        printf((msg) => {
          const message = msg.message;
          const splat = msg[Symbol.for('splat')];

          return colorize().colorize(
            msg.level,
            `[${msg.timestamp}] [${msg.level.toLocaleUpperCase()}] - ${message}${
              splat ? ' ' + JSON.stringify(splat) : ''
            }`,
          );
        }),
      ),
      transports: [new transports.Console()],
    });
  }
}
