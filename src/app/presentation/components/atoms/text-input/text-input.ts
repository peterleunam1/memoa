import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {FormControl, ReactiveFormsModule } from '@angular/forms';
import {TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-text-input',
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './text-input.html'
})
export class TextInput {
 @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() control!: FormControl;
  @Input() error: string | null = null;
}
