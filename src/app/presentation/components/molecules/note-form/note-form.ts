import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteModel } from '../../../../domain/models/note';
import { ButtonComponent } from '../../atoms/button/button';
import { TextInput } from '../../atoms/text-input/text-input';
import { TextArea } from '../../atoms/text-area/text-area';
import { TagsInputComponent } from '../../atoms/tags-input/tags-input';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

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
    TranslatePipe,
    TranslateDirective
  ],
  templateUrl: './note-form.html',
  styleUrl: './note-form.css'
})
export class NoteForm {
  private fb = inject(FormBuilder);

  noteForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    content: ['', [Validators.required, Validators.minLength(5)]],
    tags: [[]],
    color: ['#ffffff', Validators.required] // 🎨 blanco por defecto
  });
  availableColors: string[] = [
    '#ffffff', // Blanco
    '#a7f3d0', // Verde pastel
    '#bfdbfe', // Azul pastel
    '#fbcfe8', // Rosa pastel
    '#fef9c3', // Amarillo pastel
    '#ddd6fe' // Lila pastel
  ];

  @Output() addNote = new EventEmitter<NoteModel>();

  // 🔹 Diccionario centralizado de errores
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
  // 🔹 Getter para evitar repetir noteForm.get(...)
  get titleControl() {
    return this.noteForm.get('title') as FormControl;
  }

  get contentControl() {
    return this.noteForm.get('content') as FormControl;
  }
  get tagsControl(): FormControl<string[]> {
    return this.noteForm.get('tags') as FormControl<string[]>;
  }

  // 🔹 Obtiene el primer mensaje de error visible
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
      this.noteForm.markAllAsTouched(); // para mostrar errores si intentan enviar vacío
    }
  }
  
}
