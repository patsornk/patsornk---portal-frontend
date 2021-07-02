import { SidebarMenu } from './types/SidebarMenuType'

export const feature: SidebarMenu[] = [
  {
    title: 'Partner Management',
    link: '/organizationManagement'
  },
  {
    title: 'Loyalty '
  },
  {
    title: 'Marketing'
  },
  {
    title: 'Offer'
  },
  {
    title: 'Mission'
  },
  {
    title: 'Content',
    link: '/article',
    subMenu: [
      {
      title: 'Article List',
      link: '/article'
      },
      {
        title: "Editor's Pick Management",
      }
    ]
  },
  {
    title: 'Payment'
  }
]

export const member: SidebarMenu[] = [
  {
    title: 'Loyalty '
  },
  {
    title: 'Offer'
  },
  {
    title: 'Payment'
  },
  {
    title: 'Sieble'
  },
  {
    title: 'Passport'
  }
]

export const request: SidebarMenu[] = [
  {
    title: 'Content'
  },
  {
    title: 'Loyalty '
  },
  {
    title: 'Offer'
  },
  {
    title: 'Mission'
  },
  {
    title: 'Marketing'
  }
]

export const user: SidebarMenu[] = [
  {
    title: 'User Management'
  },
  {
    title: 'User Role Management'
  }
]

export const organizationManagement: SidebarMenu[] = []
