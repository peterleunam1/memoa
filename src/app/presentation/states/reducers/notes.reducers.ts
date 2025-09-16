// src/app/infrastructure/notes/notes.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { NoteModel } from '../../../domain/models/note';
import {
  addNote,
  archiveNote,
  deleteNote,
  unarchiveNote,
  updateNote
} from '../actions/notes.actions';
import { loadFromStorage, saveToStorage } from '@helpers';

const STORAGE_KEY = 'memora-notes';

const defaultState: NoteModel[] = [
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
  }
];

export const initialState: NoteModel[] = loadFromStorage(STORAGE_KEY, defaultState) || defaultState;

export const NotesReducer = createReducer(
  initialState,
  on(addNote, (state, { note }) => {
    const newState = [...state, note];
    saveToStorage(STORAGE_KEY, newState);
    return newState;
  }),
  on(deleteNote, (state, { noteId }) => {
    const newState = state.filter((note) => note.id !== noteId);
    saveToStorage(STORAGE_KEY, newState);
    return newState;
  }),
  on(archiveNote, (state, { noteId }) => {
    const newState = state.map((note) =>
      note.id === noteId ? { ...note, isArchived: true, lastEdit: new Date() } : note
    );
    saveToStorage(STORAGE_KEY, newState);
    return newState;
  }),
  on(unarchiveNote, (state, { noteId }) => {
    const newState = state.map((note) =>
      note.id === noteId ? { ...note, isArchived: false, lastEdit: new Date() } : note
    );
    saveToStorage(STORAGE_KEY, newState);
    return newState;
  }),
  on(updateNote, (state, { note }) => {
    const newState = state.map((n) =>
      n.id === note.id ? { ...note, lastEdit: new Date() } : n
    );
    saveToStorage(STORAGE_KEY, newState);
    return newState;
  })
);
