export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  createdAt?: Date;
  level: LogSeverityLevel;
  message: string;
  origin: string;
}

export class LogEntity {
  public createdAt: Date;
  public level: LogSeverityLevel;
  public message: string;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { createdAt = new Date(), level, message, origin } = options;
    this.createdAt = createdAt;
    this.level = level;
    this.message = message;
    this.origin = origin;
  }

  static fromJson = (json: string): LogEntity => {
    json = json === "" ? "{}" : json;

    const { createdAt, level, message, origin } = JSON.parse(json);
    const log = new LogEntity({
      createdAt: new Date(createdAt),
      level,
      message,
      origin,
    });

    log.createdAt = new Date(createdAt);
    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { createdAt, level, message, origin } = object;
    const log = new LogEntity({
      createdAt,
      level,
      message,
      origin,
    });

    return log;
  };
}
