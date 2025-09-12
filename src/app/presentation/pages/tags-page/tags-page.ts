import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppLayout } from '@components/templates';
import { NoteContent } from '@components/organisms';
import { NoteModel } from '@domain';
import { getCapitalize } from '@helpers';

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
