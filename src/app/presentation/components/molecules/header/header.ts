// header.ts
import { Component, inject, Input, OnInit } from '@angular/core';
import { Search } from '../../atoms/search/search';
import { CommonModule } from '@angular/common';
import { ThemeUseCase } from '../../../../application/theme/theme.use-case';
import { Dropdown, DropdownOption } from '../../atoms/dropdown/dropdown';
import { typographies } from '../../../constants/typography';
import { TypographyName } from '../../../../domain/models/typography';
import { Store } from '@ngrx/store';
import { TypographyActions } from '../../../states/actions/typography.actions';
import { map } from 'rxjs/operators';
import { ToggleSwitch } from '../../atoms/toggle-switch/toggle-switch';

@Component({
  selector: 'app-header',
  imports: [Search, CommonModule, Dropdown, ToggleSwitch],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  @Input() title = '';
  public typographies = typographies;

  value: TypographyName['name'] = 'Epilogue';

  private themeUseCase = inject(ThemeUseCase);
  private store = inject(Store<{ typography: TypographyName }>);

  dropdownOptions: DropdownOption[] = typographies.map((typography) => ({
    label: typography.name,
    value: typography.name
  }));
  defaultOption = this.dropdownOptions[0];

  isDarkMode = false;

  ngOnInit(): void {
    this.store
      .select('typography')
      .pipe(map((state) => state.name))
      .subscribe((name) => {
        this.value = name;
        this.defaultOption =
          this.dropdownOptions.find((opt) => opt.value === name) ??
          this.dropdownOptions[0];
      });
    this.isDarkMode = this.themeUseCase.getCurrentTheme() === 'dark';
  }

  onThemeChange(isDark: boolean): void {
    this.isDarkMode = isDark;
    this.themeUseCase.toggleTheme();
  }

  onOptionSelected(option: DropdownOption) {
    this.value = option.value as TypographyName['name'];
    this.store.dispatch(
      TypographyActions.setTypography({ typography: { name: this.value } })
    );
  }
}
