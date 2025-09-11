import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Menu } from '../../organisms/menu/menu';
import { MobileMenu } from '../../atoms/mobile-menu/mobile-menu';
import { Header } from '../../organisms/header/header';

@Component({
  selector: 'app-app-layout',
  imports: [CommonModule, Header, Menu, MobileMenu],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css'
})
export class AppLayout {
  @Input() title = '';
    isDrawerOpen = true;

  onToggleDrawer(open: boolean) {
    console.log('[Layout] onToggleDrawer', open);
    this.isDrawerOpen = open;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }

}
