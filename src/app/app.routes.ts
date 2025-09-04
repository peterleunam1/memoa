import { Routes } from '@angular/router';
import { Home } from './presentation/pages/home/home';
import { Archived } from './presentation/pages/archived/archived';
import { TagsPage } from './presentation/pages/tags-page/tags-page';

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
