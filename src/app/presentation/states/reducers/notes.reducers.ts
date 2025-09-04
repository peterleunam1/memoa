import { createReducer, on } from '@ngrx/store';
import { NoteModel } from '../../../domain/models/note';
import {
  addNote,
  archiveNote,
  deleteNote,
  unarchiveNote,
  updateNote
} from '../actions/notes.actions';

export const initialState: NoteModel[] = [
    {
      id: '1',
      title: 'React Performance Optimization',
      tags: ['work', 'frontend'],
      lastEdit: new Date(2024, 9, 29),
      content: 'Details about react performance...',
      isArchived: false,
      color: '#fef9c3'
    },
    {
      id: '2',
      title: 'Personal Growth Notes',
      tags: ['personal'],
      lastEdit: new Date(2024, 8, 12),
      content: 'My personal notes...',
      isArchived: false,
      color: '#bfdbfe'
    },
    {
      id: '3',
      title: 'Work Notes',
      tags: ['work'],
      lastEdit: new Date(2024, 7, 25),
      content: 'Work notes...',
      isArchived: true,
      color: '#a7f3d0'
    },
    {
      id: '4',
      title: 'Notes',
      tags: ['work'],
      lastEdit: new Date(2024, 7, 25),
      content: 'Work notes...',
      isArchived: true,
      color: '#ddd6fe'
    },
        {
      id: '5',
      title: 'Charly <3',
      tags: ['gineco', 'medicine'],
      lastEdit: new Date(2024, 9, 29),
      content: 'Details about react performance...',
      isArchived: false,
      color: '#fef9c3'
    }
  ];

export const NotesReducer = createReducer(
  initialState,
  on(addNote, (state, { note }) => [...state, note]),
  on(deleteNote, (state, { noteId }) => state.filter((note) => note.id !== noteId)),
  on(archiveNote, (state, { noteId }) =>
    state.map((note) => (note.id === noteId ? { ...note, isArchived: true, lastEdit: new Date() } : note))
  ),
  on(unarchiveNote, (state, { noteId }) =>
    state.map((note) => (note.id === noteId ? { ...note, isArchived: false, lastEdit: new Date() } : note))
  ),
  on(updateNote, (state, { note }) => state.map((n) => (n.id === note.id ? {...note, lastEdit: new Date()} : n)))
);
