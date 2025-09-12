import { inject, Injectable } from '@angular/core';
import { SendEmailGateway, SendEmailModel } from '@domain';

@Injectable({
  providedIn: 'root'
})
export class SendEmailUseCase {
  private sendEmailGateway = inject(SendEmailGateway);

  sendEmail(params: SendEmailModel): void {
    this.sendEmailGateway.sendEmail(params);
  }
}
