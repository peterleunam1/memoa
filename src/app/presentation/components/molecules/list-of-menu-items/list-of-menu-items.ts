import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem, MenuItemProps } from '@components/atoms';

@Component({
  selector: 'app-list-of-menu-items',
  imports: [MenuItem, CommonModule],
  templateUrl: './list-of-menu-items.html',
  styleUrl: './list-of-menu-items.css'
})
export class ListOfMenuItems {
  @Input() items: MenuItemProps[] = [];
  private router = inject(Router);

  get decoratedItems(): MenuItemProps[] {
    const currentUrl = this.router.url;
    return this.items.map(item => ({
      ...item,
      active: this.isActive(item, currentUrl)
    }));
  }

  private isActive(item: MenuItemProps, currentUrl: string): boolean {
    if (item.route === '/' && currentUrl === '/') {
      return true;
    }

    if (item.route === '/archived' && currentUrl.startsWith('/archived')) {
      return true;
    }

    if (item.label && currentUrl.startsWith(`/tags/${item.label.toLowerCase()}`)) {
      return true;
    }

    return false;
  }
}
