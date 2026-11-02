export interface MenuItem {
  title: string;
  href?: string;
  children?: MenuItem[];
}

export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}