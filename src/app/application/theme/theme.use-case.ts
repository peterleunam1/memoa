import { inject, Injectable } from '@angular/core';
import { ThemeGateway } from '../../domain/theme/theme.gateway';

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
  getCuurrentTheme(): 'dark' | 'light' {
    return this.ThemeGateway.getCurrentTheme();
  }
}
