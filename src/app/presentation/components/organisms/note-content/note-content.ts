import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NoteModel } from '../../../../domain/models/note';
import { ButtonComponent } from '../../atoms/button/button';
import { ListOfNotes } from '../../molecules/list-of-notes/list-of-notes';
import { NoteDetails } from '../../molecules/note-details/note-details';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import {
  addNote,
  archiveNote,
  deleteNote,
  unarchiveNote,
  updateNote
} from '../../../states/actions/notes.actions';
import { Modal } from '../../atoms/modal/modal';
import { NoteForm } from '../../molecules/note-form/note-form';

@Component({
  selector: 'app-note-content',
  imports: [ButtonComponent, ListOfNotes, NoteDetails, CommonModule, Modal, NoteForm],
  templateUrl: './note-content.html',
  styleUrl: './note-content.css'
})
export class NoteContent implements OnChanges {
  @Input() notes: NoteModel[] = [];
  @Input() isArchived = false;

  private store = inject(Store<{ notes: NoteModel[] }>);

  isModalOpen = false;
  isDeleteModalOpen = false;
  isArchiveModalOpen = false;
  selectedNoteId: string | null = null;
  currentNote: NoteModel = {} as NoteModel;

  handleClick(noteId: string) {
    this.selectedNoteId = noteId;
    this.currentNote = this.notes.find((n) => n.id === noteId) || ({} as NoteModel);
  }

  handleOpenDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  handleOpenArchiveModal() {
    this.isArchiveModalOpen = true;
  }

  delete() {
    if (!this.selectedNoteId) return;
    this.store.dispatch(deleteNote({ noteId: this.selectedNoteId }));
    this.isDeleteModalOpen = false;
  }

  archive() {
    if (!this.selectedNoteId) return;
    if (this.currentNote.isArchived) {
      this.store.dispatch(unarchiveNote({ noteId: this.selectedNoteId }));
    } else {
      this.store.dispatch(archiveNote({ noteId: this.selectedNoteId }));
    }
    this.isArchiveModalOpen = false;
  }

  handleAddNote(note: NoteModel) {
    this.store.dispatch(addNote({ note }));
    this.isModalOpen = false;
    this.selectedNoteId = note.id;
    this.currentNote = note;
  }


handleUpdate(updatedNote: NoteModel) {
  console.log(updatedNote);
  this.store.dispatch(updateNote({ note: updatedNote }));
}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['notes']) {
      if (this.notes.length > 0) {
        if (!this.notes.some(n => n.id === this.selectedNoteId)) {
          this.selectedNoteId = this.notes[0].id;
          this.currentNote = this.notes[0];
        } else {
          this.currentNote = this.notes.find(n => n.id === this.selectedNoteId) || ({} as NoteModel);
        }
      } else {
        this.selectedNoteId = null;
        this.currentNote = {} as NoteModel;
      }
    }
  }
}
