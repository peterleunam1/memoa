import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DropdownOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class Dropdown {
 @Input() options: DropdownOption[] = [];
  @Input() placeholder = 'Select...';
  @Input() selected?: DropdownOption;

  @Output() optionSelected = new EventEmitter<DropdownOption>();

  isOpen = signal(false);

  toggleDropdown() {
    this.isOpen.update((v) => !v);
  }

  selectOption(option: DropdownOption) {
    this.selected = option;
    this.optionSelected.emit(option);
    this.isOpen.set(false);
  }

  closeDropdown() {
    this.isOpen.set(false);
  }
}
