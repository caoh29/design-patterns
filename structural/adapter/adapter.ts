/**
 * ! Patrón Adapter
 *  Permite que objetos con interfaces incompatibles trabajen juntos, también es muy
 *  util para utilizar librerías de terceros en nuestra aplicación sin depender
 *  directamente de ellas.
 *
 * * Es útil cuando se quiere reutilizar una clase que no tiene la interfaz que
 * * necesitamos o cuando queremos crear una capa de abstracción para una librería
 * * de terceros.
 *
 * https://refactoring.guru/es/design-patterns/adapter
 */


import { createLogger, Logger, format, transports } from "winston";

interface ILoggerAdapter {
  file: string;

  log: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
}

export class WinstonLoggerAdapter implements ILoggerAdapter {
  public file: string;
  private readonly logger: Logger;

  constructor(file: string) {
    this.file = file;
    this.logger = createLogger({
      level: "info",
      format: format.combine(
        format.timestamp(),
        format.label({ label: "logger" }),
        format.printf((info) => `${info.timestamp} - ${info.label} - ${info.level}: ${info.message}`)
      ),
      transports: [
        new transports.File({
          filename: file,
        }),
      ],
    });
  }

  log(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }
}