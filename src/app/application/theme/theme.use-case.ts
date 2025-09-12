import { inject, Injectable } from '@angular/core';
import { ThemeGateway } from '@domain';

@Injectable({
  providedIn: 'root'
})
export class ThemeUseCase {
  private ThemeGateway = inject(ThemeGateway);

  toggleTheme(): void {
    return this.ThemeGateway.toggleTheme();
  }

  applyTheme(theme: 'dark' | 'light'): void {
    this.ThemeGateway.applyTheme(theme);
  }

  loadTheme(): void {
    this.ThemeGateway.loadTheme();
  }
  getCurrentTheme(): 'dark' | 'light' {
    return this.ThemeGateway.getCurrentTheme();
  }
}
