export class Logger {

  private readonly file: string;

  constructor(file: string) {
    this.file = file;
  }

  log(message: string): void {
    console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
  }

  error(message: string): void {
    console.error(`[${new Date().toLocaleTimeString()}] ERROR: ${message}`);
  }

  warn(message: string): void {
    console.warn(`[${new Date().toLocaleTimeString()}] WARNING: ${message}`);
  }

}