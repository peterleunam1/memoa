import { Component, inject } from '@angular/core';
import { ListOfMenuItems } from '../../molecules/list-of-menu-items/list-of-menu-items';
import { NoteModel } from '../../../../domain/models/note';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { menuItems } from '../../../constants/menu';
import { getTagsFromNotes } from '../../../helpers/get-tags-for-menu';

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

  tags$ = this.notes$.pipe(map((notes) => getTagsFromNotes(notes)));
}
