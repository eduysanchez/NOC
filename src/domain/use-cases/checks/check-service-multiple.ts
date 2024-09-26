import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private async saveLogInRepositories(log: LogEntity) {
    this.logRepository.forEach((repository) => {
      repository.saveLog(log);
    });
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`Error en el servicio: ${url}.`);
      }

      const log = new LogEntity({
        message: `Servicio ${url} esta OK`,
        level: LogSeverityLevel.low,
        origin: "check-service.ts",
      });

      this.saveLogInRepositories(log);
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const errorMessage = `Error en el servicio ${url}: ${error}.`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: "check-service.ts",
      });

      this.saveLogInRepositories(log);
      this.errorCallback && this.errorCallback(errorMessage);

      return false;
    }
  }
}
