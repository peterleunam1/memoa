import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '@components/atoms';
import { NoteModel } from '@domain';


@Component({
  selector: 'app-list-of-notes',
  imports: [CommonModule, Note],
  templateUrl: './list-of-notes.html'
})
export class ListOfNotes {
  @Input() notes: NoteModel[] = [];
  @Input() selectedNoteId: string | null = null;
  @Output() noteClick = new EventEmitter<string>();
}
