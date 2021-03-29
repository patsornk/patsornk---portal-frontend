export interface SidebarSubMenu {
  title: string
  link?: string
}

export interface SidebarMenu extends SidebarSubMenu {
  link?: string
  icon?: string
  subMenu?: SidebarMenu[]
}

export enum Organization {
  FEATURE = 'FEATURE',
  MAMBER = 'MEMBER',
  REQUEST = 'REQUEST',
  ACCOUNTMANAGEMENT = 'ACCOUNTMANAGEMENT'
}
