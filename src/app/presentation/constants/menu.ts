import { MenuItemProps } from '../components/atoms/menu-item/menu-item';

export const menuItems: MenuItemProps[] = [
  {
    label: 'menu.all',
    icon: 'fa fa-home',
    route: '/'
  },
  {
    label: 'menu.archived',
    icon: 'fa-solid fa-box-archive',
    route: '/archived'
  }
];
