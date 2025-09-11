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
import { NoteModel } from '../../../../domain/models/note';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextArea } from '../../atoms/text-area/text-area';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { Email } from '../../../../infrastructure/email/email';
import { EmailListForm } from '../email-list-form/email-list-form';
import { Modal } from '../../atoms/modal/modal';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextArea, TranslatePipe, EmailListForm, Modal],
  templateUrl: './note-details.html',
  styleUrl: './note-details.css'
})
export class NoteDetails implements OnInit, OnChanges, OnDestroy {
  @Input() note: NoteModel = {} as NoteModel;
  @Output() noteUpdated = new EventEmitter<NoteModel>();
  private emailService = inject(Email);
  contentControl = new FormControl('');
  private sub!: Subscription;
  isModalOpen = false;
  @ViewChild(EmailListForm) emailListForm!: EmailListForm;
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
    const emailsParsed = this.getEmailsAsString(data);
    console.log(emailsParsed);
    this.isLoading = true;

    try {
      await this.emailService.sendEmail({
        to_name: 'pedroagamesrocha@gmail.com',
        from_name: this.note.title,
        message: this.note.content,
        tags: this.note.tags.join(', '),
        reply_to: ''
      });
      this.handleCloseModal();
    } catch (error) {
      console.error('❌ Error al enviar correo:', error);
    } finally {
      this.isLoading = false;
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
