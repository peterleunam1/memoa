import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-text-input',
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe, TranslateDirective],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css'
})
export class TextInput {
 @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() control!: FormControl;
  @Input() error: string | null = null; // 👈 string pasado desde el padre
}
