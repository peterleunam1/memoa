import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'archived',
    renderMode: RenderMode.Client
  },
  {
    path: '',
    renderMode: RenderMode.Client
  },
  {
    path: 'tags/:tag',
    renderMode: RenderMode.Client
  }
];
