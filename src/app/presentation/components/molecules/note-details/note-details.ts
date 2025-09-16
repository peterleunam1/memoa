import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  inject,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { Modal, TextArea } from '@components/atoms';
import { EmailListForm } from '../email-list-form/email-list-form';
import { NoteModel } from '@domain';
import { SendEmailUseCase } from '@application';


@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextArea, TranslatePipe, EmailListForm, Modal],
  templateUrl: './note-details.html'
})
export class NoteDetails implements OnInit, OnChanges, OnDestroy {
  @Input() note: NoteModel = {} as NoteModel;
  @Output() noteUpdated = new EventEmitter<NoteModel>();
  @ViewChild(EmailListForm) emailListForm!: EmailListForm;
  private emailService = inject(SendEmailUseCase);
  private sub!: Subscription;
  contentControl = new FormControl('');
  isModalOpen = false;
  isLoading = false;

  ngOnInit() {
    this.sub = this.contentControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        if (this.note) {
          this.noteUpdated.emit({
            ...this.note,
            content: value ?? ''
          });
        }
      });
  }

  handleOpenModal() {
    this.isModalOpen = true;
  }

  getEmailsAsString(data: { emails: string[] }): string {
    return data.emails.join(', ');
  }
  handleCloseModal() {
    this.isModalOpen = false;
    this.emailListForm.handleClose();
  }
  async onEmailsSubmit(data: { emails: string[] }) {
    this.isLoading = true;
    const emailsParsed = this.getEmailsAsString(data);

    try {
      this.emailService.sendEmail({
        to_name: emailsParsed,
        from_name: this.note.title,
        message: this.note.content,
        tags: this.note.tags.join(', '),
        reply_to: ''
      });
      this.handleCloseModal();
    } catch (error) {
      console.error('❌ Error al enviar correo:', error);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['note'] && this.note) {
      this.contentControl.setValue(this.note.content ?? '', { emitEvent: false });
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
