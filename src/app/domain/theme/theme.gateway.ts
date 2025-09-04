export abstract class ThemeGateway {
  abstract toggleTheme(): void;
  abstract applyTheme(theme: 'dark' | 'light'): void;
  abstract loadTheme(): void;
  abstract getCurrentTheme(): 'dark' | 'light';
}