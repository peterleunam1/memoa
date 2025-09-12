import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ListOfMenuItems } from '@components/molecules';
import { NoteModel } from '@domain';
import { menuItems } from '@constants';
import { getTagsFromNotes } from '@helpers';

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
