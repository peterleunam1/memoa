import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeGateway } from '../../domain/theme/theme.gateway';

@Injectable({
  providedIn: 'root'
})
export class ThemeService extends ThemeGateway {
  private readonly storageKey = 'theme';
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    super();
    this.loadTheme();
  }

  toggleTheme(): void {
    const isDark = document.documentElement.classList.contains('dark');
    this.applyTheme(isDark ? 'light' : 'dark');
  }

  applyTheme(theme: 'dark' | 'light'): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem(this.storageKey, theme);
    }
  }

  loadTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return; // 👈 evita ejecutar en SSR

    const savedTheme = localStorage.getItem(this.storageKey) as 'dark' | 'light' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.applyTheme(savedTheme ?? (prefersDark ? 'dark' : 'light'));
  }

getCurrentTheme(): 'dark' | 'light' {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.storageKey) as 'dark' | 'light';
    }
    // Valor por defecto cuando NO hay document (SSR / tests)
    return 'light';
  }
}
