import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent, TextInput } from '@components/atoms';

@Component({
  selector: 'app-email-list-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInput, ButtonComponent, TranslatePipe],
  templateUrl: './email-list-form.html'
})
export class EmailListForm {
  @Input() isLoading = false;
  private fb = inject(FormBuilder);

  @Output() emailsSubmit = new EventEmitter<{ emails: string[] }>();

  form: FormGroup = this.fb.group({
    emails: this.fb.array<FormControl<string | null>>([
      this.fb.control<string | null>('', [Validators.required, Validators.email])
    ])
  });

  get emails() {
    return this.form.get('emails') as FormArray<FormControl<string | null>>;
  }

  get emailControls() {
    return this.emails.controls;
  }

  get messageControl(): FormControl<string | null> {
    return this.form.get('message') as FormControl<string | null>;
  }

  // ✅ Mensajes de error personalizados
  getErrorMessage(control: FormControl<string | null>): string | null {
    if (control.hasError('required')) return 'share.emailRequired';
    if (control.hasError('email')) return 'share.emailInvalid';
    return null;
  }

  addEmail() {
    const lastControl = this.emails.at(this.emails.length - 1);

    // ✅ Solo permite agregar si el último email es válido
    if (lastControl && lastControl.invalid) {
      lastControl.markAsTouched();
      return;
    }

    this.emails.push(this.fb.control<string | null>('', [Validators.required, Validators.email]));
  }
  handleClose() {
    this.emails.clear(); // elimina todos los controles
    this.emails.push(this.fb.control<string | null>('', [Validators.required, Validators.email]));
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
  }

  submit() {
    if (this.form.valid) {
      this.emailsSubmit.emit({
        emails: this.form.value.emails as string[]
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
