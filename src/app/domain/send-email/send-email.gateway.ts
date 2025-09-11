import { SendEmailModel } from '../models/send-email';

export abstract class SendEmailGateway {
  abstract sendEmail(params: SendEmailModel): void;
}
