import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
@Injectable({
  providedIn: 'root'
})
export class Email {
    private serviceId = 'service_zidfslc';
  private templateId = 'template_scmpbpp';
  private publicKey = '3vRTAR4-4Vj1oZh2b';

  sendEmail(params: { to_name: string; from_name: string; message: string; reply_to: string, tags: string }): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceId, this.templateId, params, this.publicKey);
  }
}
