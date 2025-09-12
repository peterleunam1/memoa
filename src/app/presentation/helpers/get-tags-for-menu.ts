import { NoteModel } from '@domain';

export function getTagsFromNotes(notes: NoteModel[]) {
  const tagSet = new Set<string>();

  notes.forEach((note) => {
    note.tags.forEach((tag) => tagSet.add(tag.toLowerCase()));
  });

  return Array.from(tagSet).map((tag) => ({
    label: tag.charAt(0).toUpperCase() + tag.slice(1),
    icon: 'fa-solid fa-tags',
    route: `/tags/${tag}`
  }));
}
