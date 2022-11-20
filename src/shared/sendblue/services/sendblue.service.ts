import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Mailer } from '../interface/sendblue.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sendblue = require('sib-api-v3-sdk');

@Injectable()
export class SendBlueService implements Mailer {
  private mailClient: any;
  private apiKey: any;
  private mailer: any;

  constructor(private config: ConfigService) {
    this.mailClient = sendblue.ApiClient.instance;
    this.apiKey = this.mailClient.authentications['api-key'];
    this.apiKey.apiKey = config.get('email').apiKey;
    console.log(config.get('email').apiKey);

    this.mailer = new sendblue.TransactionalEmailsApi();
  }
  send(payload: {
    to: string;
    template: any;
    data: any;
    headers?: string;
  }): Promise<any> {
    let sendSmtpEmail = new sendblue.SendSmtpEmail();

    console.log(payload);

    try {
      sendSmtpEmail = {
        to: [
          {
            email: payload.to,
          },
        ],
        templateId: payload.template,
        params: payload.data,
      };
      return this.mailer.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
      throw new BadRequestException(
        '[Email] templateId ' +
          payload.template +
          ' to ' +
          payload.to +
          ' failed: ' +
          error.getResponseBody(),
        error,
      );
    }
  }
}
