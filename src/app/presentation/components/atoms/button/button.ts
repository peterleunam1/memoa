import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html'
})
export class ButtonComponent {
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;
  @Input() typeButton = 'button';
  @Input() withBorder = true;
  get classes(): string {
    const base =
      'font-medium rounded-lg text-sm py-2.5 focus:outline-none cursor-pointer w-full';

    const variants: Record<typeof this.type, string> = {
      primary: 'text-white bg-purple-700 hover:bg-purple-900 focus:ring-4 focus:ring-purple-200 ',
      secondary:
        'text-gray-900 border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:ring-purple-200 dark:text-white dark:border-gray-600 dark:hover:bg-[#181818] dark:hover:border-gray-600 dark:focus:ring-gray-700'
    };

    return `${base} ${variants[this.type]}`;
  }
}
