import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";

const newLog = new LogEntity({
  level: LogSeverityLevel.low,
  message: "Test message",
  origin: "log.datasource.test.ts",
});

describe("log.datasource.test.ts", () => {
  class MockLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test("Should test abstract class LogDatasource", async () => {
    const mockLogDatasource = new MockLogDatasource();

    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
    expect(typeof mockLogDatasource.saveLog).toBe("function");
    expect(typeof mockLogDatasource.getLogs).toBe("function");

    await mockLogDatasource.saveLog(newLog);

    const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
