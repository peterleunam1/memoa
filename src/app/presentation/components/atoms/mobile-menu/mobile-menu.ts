import { Component, Input } from '@angular/core';
import { ListOfMenuItems } from '../../molecules/list-of-menu-items/list-of-menu-items';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-menu',
  imports: [ListOfMenuItems, TranslatePipe, CommonModule],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.css'
})
export class MobileMenu {
  @Input() orientation: 'left' | 'right' = 'left';
  @Input() isDrawerOpen = false;
  @Input() icon = 'fa-solid fa-bars';
}
