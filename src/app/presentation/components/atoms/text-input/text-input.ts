import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [CommonModule, ReactiveFormsModule],
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
