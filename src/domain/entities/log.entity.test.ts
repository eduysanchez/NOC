import exp from "constants";
import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("log.entity.test.ts", () => {
  const logObject = {
    level: LogSeverityLevel.high,
    message: "Test message",
    origin: "log.entity.test.ts",
  };

  test("Should create a LogEntity instance", () => {
    const log = new LogEntity(logObject);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(logObject.level);
    expect(log.message).toBe(logObject.message);
    expect(log.origin).toBe(logObject.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("Should create a LogEntity instance from JSON", () => {
    const json = `{"createdAt":"2024-09-30T10:57:15.168Z","level":"low","message":"Servicio https://www.google.com esta OK","origin":"check-service.ts"}`;
    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe("low");
    expect(log.message).toBe("Servicio https://www.google.com esta OK");
    expect(log.origin).toBe("check-service.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("Should create a LogEntity instance from object", () => {
    const log = LogEntity.fromObject(logObject);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(logObject.level);
    expect(log.message).toBe(logObject.message);
    expect(log.origin).toBe(logObject.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
