import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Header, Menu } from '@components/organisms';

@Component({
  selector: 'app-app-layout',
  imports: [CommonModule, Header, Menu],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css'
})
export class AppLayout {
  @Input() title = '';
    isDrawerOpen = true;

  onToggleDrawer(open: boolean) {
    this.isDrawerOpen = open;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }

}
