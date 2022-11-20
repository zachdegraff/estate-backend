import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcome(firstName: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome To Haven, User',
      template: './first',
      context: {
        firstName,
      },
    });
  }
}
