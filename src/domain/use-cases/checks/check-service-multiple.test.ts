import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe("check-service-multiple.test.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const MockLogRepositoryOne = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const MockLogRepositoryTwo = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const MockSuccessCallback = jest.fn();
  const MockErrorCallback = jest.fn();

  const checkServiceMultiple = new CheckServiceMultiple(
    [MockLogRepositoryOne, MockLogRepositoryTwo],
    MockSuccessCallback,
    MockErrorCallback
  );

  test("Should call successCallback when fetch returns true", async () => {
    const ok = await checkServiceMultiple.execute("https://www.google.com");

    expect(ok).toBe(true);
    expect(MockSuccessCallback).toHaveBeenCalled();
    expect(MockErrorCallback).not.toHaveBeenCalled();
    expect(MockLogRepositoryOne.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(MockLogRepositoryTwo.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  test("Should call errorCallback when fetch returns false", async () => {
    const ok = await checkServiceMultiple.execute(
      "https://www.eduysanchez.com"
    );

    expect(ok).toBe(false);
    expect(MockSuccessCallback).not.toHaveBeenCalled();
    expect(MockErrorCallback).toHaveBeenCalled();
    expect(MockLogRepositoryOne.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(MockLogRepositoryTwo.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
