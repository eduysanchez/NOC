import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendLogsEmail } from "../domain/use-cases/emails/send-logs-email";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const logRepository = new LogRepositoryImpl(
  // new FileSystemDataSource()
  new MongoLogDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started.");

    // TODO: Enviar email
    // new SendLogsEmail(emailService, logRepository).execute(
    //   "eduysanchez@hotmail.com"
    // );

    // emailService.sendEmail({
    //   to: "eduysanchez@hotmail.com",
    //   subject: "Hola mundo",
    //   html: "<h1>Hola mundo</h1>",
    // });

    // emailService.sendEmailAttachmentFileSystemLog("eduysanchez@hotmail.com");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://www.google.com";
      new CheckService(
        logRepository,
        () => console.log(`Servicio ${url} esta OK`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
