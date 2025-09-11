import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { SendEmailModel } from '../../domain/models/send-email';
import { SendEmailGateway } from '../../domain/send-email/send-email.gateway';
@Injectable({
  providedIn: 'root'
})
export class SendEmailService extends SendEmailGateway {
    private serviceId = 'service_zidfslc';
  private templateId = 'template_scmpbpp';
  private publicKey = '3vRTAR4-4Vj1oZh2b';

  sendEmail(params: SendEmailModel): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceId, this.templateId, params, this.publicKey);
  }
}
