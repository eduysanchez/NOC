import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface SendLogsEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendLogsEmail implements SendLogsEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sentEmail =
        await this.emailService.sendEmailAttachmentFileSystemLog(to);
      if (!sentEmail) {
        throw new Error("Error al enviar el email");
      }

      const log = new LogEntity({
        message: `Email enviado a ${to}`,
        level: LogSeverityLevel.low,
        origin: "send-logs-email.ts",
      });

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `Email enviado no enviado a ${to}. Error: ${error}`,
        level: LogSeverityLevel.high,
        origin: "send-logs-email.ts",
      });

      this.logRepository.saveLog(log);
      return false;
    }
  }
}
