import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-menu',
  imports: [CommonModule],
  templateUrl: './mobile-menu.html'
})
export class MobileMenu {
  @Input() orientation: 'left' | 'right' = 'left';
  @Input() isDrawerOpen = false;
  @Input() icon = 'fa-solid fa-bars';
}
