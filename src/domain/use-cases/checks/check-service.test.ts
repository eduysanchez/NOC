import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe("check-service.test.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const MockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const MockSuccessCallback = jest.fn();
  const MockErrorCallback = jest.fn();

  const checkService = new CheckService(
    MockLogRepository,
    MockSuccessCallback,
    MockErrorCallback
  );

  test("Should call successCallback when fetch returns true", async () => {
    const ok = await checkService.execute("https://www.google.com");

    expect(ok).toBe(true);
    expect(MockSuccessCallback).toHaveBeenCalled();
    expect(MockErrorCallback).not.toHaveBeenCalled();
    expect(MockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  test("Should call errorCallback when fetch returns false", async () => {
    const ok = await checkService.execute("https://www.eduysanchez.com");

    expect(ok).toBe(false);
    expect(MockSuccessCallback).not.toHaveBeenCalled();
    expect(MockErrorCallback).toHaveBeenCalled();
    expect(MockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
