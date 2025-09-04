export interface NoteModel {
  id: string;
  title: string;
  tags: string[];
  lastEdit: Date;
  content: string;
  isArchived: boolean;
  color: string;
}
