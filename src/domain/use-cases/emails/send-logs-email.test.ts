import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";
import { SendLogsEmail } from "./send-logs-email";

describe("send-logs-email.test.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockEmailService = {
    sendEmailAttachmentFileSystemLog: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendLogsEmail = new SendLogsEmail(
    mockEmailService as any,
    mockLogRepository
  );

  const email = "eduysanchez@hotmail.com";

  test("should send an email with the logs", async () => {
    const result = await sendLogsEmail.execute(email);

    expect(result).toBeTruthy();
    expect(
      mockEmailService.sendEmailAttachmentFileSystemLog
    ).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message: `Email enviado a ${email}`,
      origin: "send-logs-email.ts",
    });
  });

  test("should log in case of error", async () => {
    mockEmailService.sendEmailAttachmentFileSystemLog.mockReturnValueOnce(
      false
    );

    const result = await sendLogsEmail.execute(email);

    expect(result).toBeFalsy();
    expect(
      mockEmailService.sendEmailAttachmentFileSystemLog
    ).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: `Error: Error al enviar el email`,
      origin: "send-logs-email.ts",
    });
  });
});
