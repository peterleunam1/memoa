// header.ts
import { Component, inject, Input } from '@angular/core';
import { Search } from '../../atoms/search/search';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toggleTheme } from '../../../states/actions/theme.actions';
import { Observable } from 'rxjs';
import { ThemeUseCase } from '../../../../application/theme/theme.use-case';

type Theme = 'dark' | 'light';

@Component({
  selector: 'app-header',
  imports: [Search, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @Input() title = '';

  private themeUseCase = inject(ThemeUseCase);

  toggleTheme(): void {
    this.themeUseCase.toggleTheme();
  }
}
