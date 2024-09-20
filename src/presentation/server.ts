import { CheckService } from "../domain/use-cases/checks/ckeck-service";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started.");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://www.google.com";
      new CheckService(
        () => console.log(`Servicio ${url} esta OK`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
