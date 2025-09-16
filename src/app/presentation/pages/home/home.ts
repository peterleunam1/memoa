import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppLayout } from '@components/templates';
import { NoteContent } from '@components/organisms';
import { NoteModel } from '@domain';

@Component({
  selector: 'app-home',
  imports: [AppLayout, NoteContent, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private store = inject(Store<{ notes: NoteModel[] }>);

 filteredNotes$: Observable<NoteModel[]> = this.store.select('notes').pipe(
  map((notes: NoteModel[] = []) => 
    notes
      .filter(n => !n.isArchived)
      .sort((a, b) => {
        const dateA = a?.lastEdit ? new Date(a.lastEdit).getTime() : 0;
        const dateB = b?.lastEdit ? new Date(b.lastEdit).getTime() : 0;
        return dateB - dateA;
      })
  )
);

}
