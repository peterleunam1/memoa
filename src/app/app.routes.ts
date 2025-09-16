import { Routes } from '@angular/router';
import { Archived, Home, TagsPage } from '@pages';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'archived',
    component: Archived
  },
  {
    path: 'tags/:tag',
    component: TagsPage
  }
];
