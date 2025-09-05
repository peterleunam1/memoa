import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Header } from '../../molecules/header/header';
import { Menu } from '../../organisms/menu/menu';

@Component({
  selector: 'app-app-layout',
  imports: [CommonModule, Header, Menu],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css'
})
export class AppLayout {
  @Input() title = '';
}
