import fs from "fs";

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDatasource {
  private readonly logPath: string = "logs/";
  private readonly allLogsPath: string = "logs/logs-all.log";
  private readonly lowLogsPath: string = "logs/logs-low.log";
  private readonly mediumLogsPath: string = "logs/logs-medium.log";
  private readonly highLogsPath: string = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = (): void => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [
      this.allLogsPath,
      this.lowLogsPath,
      this.mediumLogsPath,
      this.highLogsPath,
    ].forEach((path) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, "");
    });
  };

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(log)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);

    switch (log.level) {
      case LogSeverityLevel.low:
        fs.appendFileSync(this.lowLogsPath, logAsJson);
        break;
      case LogSeverityLevel.medium:
        fs.appendFileSync(this.mediumLogsPath, logAsJson);
        break;
      case LogSeverityLevel.high:
        fs.appendFileSync(this.highLogsPath, logAsJson);
        break;
    }
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.lowLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`${severityLevel} no se esta implementado.`);
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    if (content === "") return [];
    const logs = content.split("\n").map(LogEntity.fromJson);
    return logs;
  };
}
