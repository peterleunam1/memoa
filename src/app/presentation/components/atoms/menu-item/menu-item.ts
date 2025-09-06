import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


export interface MenuItemProps {
  route?: string;
  label: string;
  icon: string;
  active?: boolean;
}
@Component({
  selector: 'app-menu-item',
  imports: [RouterModule, CommonModule, TranslatePipe],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.css'
})

export class MenuItem {
  @Input() props: MenuItemProps = {} as MenuItemProps; 
}
