import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../atoms/note/note';
import { NoteModel } from '../../../../domain/models/note';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-list-of-notes',
  standalone: true,
  imports: [CommonModule, Note, TranslatePipe, TranslateDirective],
  templateUrl: './list-of-notes.html'
})
export class ListOfNotes {
  @Input() notes: NoteModel[] = [];
  @Input() selectedNoteId: string | null = null;
  @Output() noteClick = new EventEmitter<string>();
}
