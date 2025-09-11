import { inject, Injectable } from '@angular/core';
import { SendEmailGateway } from '../../domain/send-email/send-email.gateway';
import { SendEmailModel } from '../../domain/models/send-email';

@Injectable({
  providedIn: 'root'
})
export class SendEmailUseCase {
  private sendEmailGateway = inject(SendEmailGateway);

  sendEmail(params: SendEmailModel): void {
    this.sendEmailGateway.sendEmail(params);
  }
}
