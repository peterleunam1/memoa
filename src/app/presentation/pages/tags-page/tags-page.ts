import { Component, inject } from '@angular/core';
import { AppLayout } from '../../components/templates/app-layout/app-layout';
import { ActivatedRoute } from '@angular/router';
import { getCapitalize } from '../../helpers/get-capitalize';
import { Store } from '@ngrx/store';
import { NoteModel } from '../../../domain/models/note';
import { map, Observable, switchMap } from 'rxjs';
import { NoteContent } from '../../components/organisms/note-content/note-content';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tags-page',
  imports: [AppLayout, NoteContent, CommonModule],
  templateUrl: './tags-page.html',
  styleUrl: './tags-page.css'
})
export class TagsPage {
  private route = inject(ActivatedRoute);
  private store = inject(Store<{ notes: NoteModel[] }>);

  tag$: Observable<string> = this.route.paramMap.pipe(
    map(params => getCapitalize(params.get('tag') || ''))
  );
filteredNotes$: Observable<NoteModel[]> = this.tag$.pipe(
  switchMap((tag: string) =>
    this.store.select('notes').pipe(
      map((notes: NoteModel[]) =>
        notes
          .filter((n: NoteModel) => n.tags.includes(tag.toLocaleLowerCase()))
          .sort(
            (a: NoteModel, b: NoteModel) =>
              new Date(b.lastEdit).getTime() -
              new Date(a.lastEdit).getTime()
          )
      )
    )
  )
);

}
