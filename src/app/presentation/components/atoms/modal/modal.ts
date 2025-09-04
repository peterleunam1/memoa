import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  handleClose() {
    this.closed.emit();
  }

}
