import { WinstonLoggerAdapter } from "./adapter";


const logger = new WinstonLoggerAdapter("structural/adapter/log.txt");

logger.log("Este es un mensaje de log");
logger.error("Este es un mensaje de error");
logger.warn("Este es un mensaje de advertencia");