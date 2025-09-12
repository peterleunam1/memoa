import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ToggleSwitch } from '../../atoms/toggle-switch/toggle-switch';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Dropdown, DropdownOption, MobileMenu } from '@components/atoms';
import { ListOfMenuItems } from '@components/molecules';
import { NoteModel, TypographyName } from '@domain';
import { menuItems, typographies } from '@constants';
import { getTagsFromNotes, loadFromStorage, saveToStorage } from '@helpers';
import { ThemeUseCase } from '@application';
import { TypographyActions } from '@states';


@Component({
  selector: 'app-header',
  imports: [CommonModule, Dropdown, ToggleSwitch, TranslatePipe, MobileMenu, ListOfMenuItems],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  @Input() title = '';
  private store = inject(Store<{ notes: NoteModel[] }>);
  isMenuOpen = false;
  isConfigOpen = false;
  notes$ = this.store.select('notes');
  menuItems = menuItems;

  tags$ = this.notes$.pipe(map((notes) => getTagsFromNotes(notes)));
  
  public typographies = typographies;

  value: TypographyName['name'] = 'Epilogue';

  private themeUseCase = inject(ThemeUseCase);

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
    private translate = inject(TranslateService);

  options: DropdownOption[] = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' }
  ];

  currentLang = signal<string>(
    loadFromStorage<string>('lang', this.translate.getCurrentLang())
  );

  selectedOption = signal<DropdownOption | undefined>(undefined);

  constructor() {
    const lang = this.currentLang();
    this.translate.use(lang);
    this.selectedOption.set(this.options.find(opt => opt.value === lang));
  }

  onLanguageSelected(option: DropdownOption) {
    this.translate.use(option.value.toString());
    this.currentLang.set(option.value.toString());
    this.selectedOption.set(option);
    saveToStorage('lang', option.value.toString());
  }

  onUpdateDrawer(type: 'config' | 'menu'): void {
  if (type === 'config') {
    this.isConfigOpen = !this.isConfigOpen;
    if (this.isConfigOpen) this.isMenuOpen = false;
  }
  if (type === 'menu') {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) this.isConfigOpen = false;
  }
}

}
