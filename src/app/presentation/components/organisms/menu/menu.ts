import { Component, inject } from '@angular/core';
import { ListOfMenuItems } from '../../molecules/list-of-menu-items/list-of-menu-items';
import { MenuItemProps } from '../../atoms/menu-item/menu-item';
import { NoteModel } from '../../../../domain/models/note';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

const menuItems: MenuItemProps[] = [
  {
    label: 'All Notes',
    icon: 'fa fa-home',
    route: '/'
  },
  {
    label: 'Archived Notes',
    icon: 'fa-solid fa-box-archive',
    route: '/archived'
  }
];

@Component({
  selector: 'app-menu',
  imports: [ListOfMenuItems, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  private store = inject(Store<{ notes: NoteModel[] }>);
  notes$ = this.store.select('notes');

  menuItems = menuItems;

  // 🔹 Construir dinámicamente las tags únicas en lower case
  tags$ = this.notes$.pipe(
    map((notes: NoteModel[]) => {
      const tagSet = new Set<string>();

      notes.forEach(note => {
        note.tags.forEach(tag => tagSet.add(tag.toLowerCase()));
      });

      // Convertimos a objetos MenuItemProps
      return Array.from(tagSet).map(tag => ({
        label: tag.charAt(0).toUpperCase() + tag.slice(1), // Capitalizar
        icon: 'fa-solid fa-tags',
        route: `/tags/${tag}`
      }));
    })
  );
}
