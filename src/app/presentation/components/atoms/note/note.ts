import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note.html'
})
export class Note {
  @Input() active = false;
  @Input() title!: string;
  @Input() tags: string[] = [];
  @Input() lastEdit!: Date;
  @Input() color = '#fff';

  get articleClasses(): string {
    const base =
      'flex flex-col gap-2 p-2 w-full rounded-lg transition-colors cursor-pointer mb-2 hover:scale-101 ease-in-out duration-300';
    return this.active
      ? `${base} md:border-[4px] md:border-purple-600 ease duration-300`
      : `${base} border-b border-b-gray-200 bg-white hover:bg-gray-100 ease duration-300`;
  }
}
