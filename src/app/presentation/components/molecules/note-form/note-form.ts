import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent, TagsInputComponent, TextArea, TextInput } from '@components/atoms';
import { NoteModel } from '@domain';
import { availableColors } from '@constants';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonComponent,
    TextInput,
    TextArea,
    TagsInputComponent,
    TranslatePipe
  ],
  templateUrl: './note-form.html'
})
export class NoteForm {
  @Output() addNote = new EventEmitter<NoteModel>();
  private fb = inject(FormBuilder);

  noteForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    content: ['', [Validators.required, Validators.minLength(5)]],
    tags: [[]],
    color: ['#ffffff', Validators.required]
  });

  availableColors: string[] = availableColors;

  errorMessages: Record<string, Record<string, string>> = {
    title: {
      required: 'main.form.titleRequired',
      minlength: 'main.form.titleMinLength'
    },
    content: {
      required: 'main.form.contentRequired',
      minlength: 'main.form.contentMinLength'
    }
  };

  get titleControl() {
    return this.noteForm.get('title') as FormControl;
  }

  get contentControl() {
    return this.noteForm.get('content') as FormControl;
  }
  get tagsControl(): FormControl<string[]> {
    return this.noteForm.get('tags') as FormControl<string[]>;
  }

  getErrorMessage(controlName: 'title' | 'content'): string | null {
    const control = this.noteForm.get(controlName);
    if (control?.touched && control?.errors) {
      const firstErrorKey = Object.keys(control.errors)[0];
      return this.errorMessages[controlName][firstErrorKey];
    }
    return null;
  }

  onSubmit() {
    if (this.noteForm.valid) {
      const newNote: NoteModel = {
        id: crypto.randomUUID(),
        isArchived: false,
        lastEdit: new Date(),
        tags: [],
        ...this.noteForm.value
      };
      this.addNote.emit(newNote);
      this.noteForm.reset();
    } else {
      this.noteForm.markAllAsTouched();
    }
  }
  
}
