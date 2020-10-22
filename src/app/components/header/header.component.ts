import { ChangeDetectionStrategy, Component } from '@angular/core';

interface MenuItem {
  link: string;
  label: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    link: '/home',
    label: 'Home',
  },
  {
    link: '/signup',
    label: 'Signup',
  },
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  menuItems: MenuItem[] = MENU_ITEMS;

  constructor() {}
}
