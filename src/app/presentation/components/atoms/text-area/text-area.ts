import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './text-area.html',
  styleUrl: './text-area.css'
})
export class TextArea implements OnInit {
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() rows = 4;
  @Input() control!: FormControl;
  @Input() error: string | null = null;
  @Input() border = true;
  @Input() initialValue: string | null = null;
  @Input() withLabel = true;

  ngOnInit() {
    if (this.initialValue && !this.control.value) {
      this.control.setValue(this.initialValue);
    }
  }
}
