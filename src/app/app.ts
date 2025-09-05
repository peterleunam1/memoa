import { Component, DestroyRef, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

type Theme = 'dark' | 'light';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  private store = inject(Store);
  
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID); // ✅ ya no necesitas constructor

  constructor() {
    this.store
      .select('theme')
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(theme => {
        if (!isPlatformBrowser(this.platformId)) return;
        document.documentElement.classList.toggle('dark', theme === 'dark');
      });
  }
    typography$: Observable<string> = this.store
    .select('typography')
    .pipe(map(t => t.name));
}
