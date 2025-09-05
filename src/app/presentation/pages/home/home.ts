import { Component, inject } from '@angular/core';
import { NoteContent } from '../../components/organisms/note-content/note-content';
import { CommonModule } from '@angular/common';
import { AppLayout } from '../../components/templates/app-layout/app-layout';
import { NoteModel } from '../../../domain/models/note';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  imports: [AppLayout, NoteContent, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private store = inject(Store<{ notes: NoteModel[] }>);

 filteredNotes$: Observable<NoteModel[]> = this.store.select('notes').pipe(
  map((notes: NoteModel[]) =>
    notes
      .filter(n => !n.isArchived)
      .sort((a, b) => new Date(b.lastEdit).getTime() - new Date(a.lastEdit).getTime())
  )
);


}
