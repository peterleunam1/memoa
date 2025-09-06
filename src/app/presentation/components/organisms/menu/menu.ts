import { Component, inject } from '@angular/core';
import { ListOfMenuItems } from '../../molecules/list-of-menu-items/list-of-menu-items';
import { MenuItemProps } from '../../atoms/menu-item/menu-item';
import { NoteModel } from '../../../../domain/models/note';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

const menuItems: MenuItemProps[] = [
  {
    label: 'menu.all',
    icon: 'fa fa-home',
    route: '/'
  },
  {
    label: 'menu.archived',
    icon: 'fa-solid fa-box-archive',
    route: '/archived'
  }
];

@Component({
  selector: 'app-menu',
  imports: [ListOfMenuItems, CommonModule, TranslatePipe],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  private store = inject(Store<{ notes: NoteModel[] }>);
  notes$ = this.store.select('notes');

  menuItems = menuItems;

  tags$ = this.notes$.pipe(
    map((notes: NoteModel[]) => {
      const tagSet = new Set<string>();

      notes.forEach(note => {
        note.tags.forEach(tag => tagSet.add(tag.toLowerCase()));
      });
      return Array.from(tagSet).map(tag => ({
        label: tag.charAt(0).toUpperCase() + tag.slice(1), 
        icon: 'fa-solid fa-tags',
        route: `/tags/${tag}`
      }));
    })
  );
}
