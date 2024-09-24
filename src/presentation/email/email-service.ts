import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  constructor() {}

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  public async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, html, attachments = [] } = options;

    try {
      const sendInformatio = await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html,
        attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailAttachmentFileSystemLog(to: string | string[]) {
    const subject = "Logs del sistema";
    const html = `
      <h1>Logs del sistema</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <p>Ver logs en el archivo adjunto.</p>
      `;

    const attachments: Attachment[] = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
    ];

    return this.sendEmail({ to, subject, html, attachments });
  }
}
