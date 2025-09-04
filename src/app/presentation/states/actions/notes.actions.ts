import { createAction, props } from '@ngrx/store';
import { NoteModel } from '../../../domain/models/note';

export const addNote = createAction('[Notes Component] Add Note', props<{ note: NoteModel }>());
export const deleteNote = createAction('[Notes Component] Delete Note', props<{ noteId: string }>());
export const archiveNote = createAction('[Notes Component] Archive Note', props<{ noteId: string }>());
export const unarchiveNote = createAction('[Notes Component] Unarchive Note', props<{ noteId: string }>());
export const updateNote = createAction('[Notes Component] Update Note', props<{ note: NoteModel }>());
