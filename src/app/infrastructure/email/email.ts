import { Injectable } from '@angular/core';
import { SendEmailGateway, SendEmailModel } from '@domain';
import { environment } from '@environments';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

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
