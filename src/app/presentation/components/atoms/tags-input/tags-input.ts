/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-tags-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tags-input.html',
  styleUrl: './tags-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsInputComponent),
      multi: true
    }
  ]
})
export class TagsInputComponent implements ControlValueAccessor {
  @Input() predefinedTags: string[] = [];

  private _value: string[] = [];
  get value(): string[] {
    return this._value;
  }
  set value(val: string[]) {
    this._value = val;
    this.onChange(this._value);
    this.onTouched();
  }

  inputValue = '';
  showDropdown = false;
  disabled = false;

  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  // ControlValueAccessor
  writeValue(value: string[] | null): void {
    this._value = value ?? [];
  }
  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  addTag(tag: string): void {
    const clean = tag.trim();
    if (clean && !this._value.includes(clean)) {
      this.value = [...this._value, clean];
    }
    this.inputValue = '';
    this.showDropdown = false;
  }

  removeTag(tag: string): void {
    this.value = this._value.filter(t => t !== tag);
  }

  onFocus(): void {
    this.showDropdown = true;
  }

  onBlur(): void {
    // pequeño delay para permitir clic en las opciones
    setTimeout(() => (this.showDropdown = false), 200);
  }

  filteredTags(): string[] {
    const term = this.inputValue.toLowerCase();
    return this.predefinedTags.filter(
      tag => tag.toLowerCase().includes(term) && !this._value.includes(tag)
    );
  }
}
