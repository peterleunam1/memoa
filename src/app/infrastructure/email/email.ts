import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { SendEmailModel } from '../../domain/models/send-email';
import { SendEmailGateway } from '../../domain/send-email/send-email.gateway';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SendEmailService extends SendEmailGateway {
  private serviceId = environment.SERVICE_ID;
  private templateId = environment.TEMPLATE_ID;
  private publicKey = environment.PUBLIC_KEY;

  sendEmail(params: SendEmailModel): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceId, this.templateId, params, this.publicKey);
  }
}
