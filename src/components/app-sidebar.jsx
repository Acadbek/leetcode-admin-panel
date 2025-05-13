import * as React from 'react';
import {
  ArrowUpCircleIcon,
  CameraIcon,
  ChartNoAxesCombined,
  Code,
  FileCodeIcon,
  FileTextIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  MessageCircleQuestion,
  PartyPopper,
  Rss,
  SearchIcon,
  SettingsIcon,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'Asadbek',
    email: 'a@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/87940040?v=4',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboardIcon,
    },
    {
      title: 'Company',
      url: '/company',
      icon: ListIcon,
    },
    {
      title: 'Groups',
      url: '/groups',
      icon: ListIcon,
    },
    {
      title: 'Users',
      url: '/users',
      icon: ListIcon,
    },
    {
      title: 'Masalalar',
      url: '/problems',
      icon: Code,
    },
    {
      title: 'Musobaqalar',
      url: '/contests',
      icon: PartyPopper,
    },
    {
      title: 'Yordam va Shikoyatlar',
      url: '/help',
      icon: MessageCircleQuestion,
    },
    {
      title: 'Blog / Yangiliklar',
      url: '/blog',
      icon: Rss,
    },
    {
      title: 'Analitika',
      url: '/analytics',
      icon: ChartNoAxesCombined,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: CameraIcon,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: FileTextIcon,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: FileCodeIcon,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Sozlamalar',
      url: '/settings',
      icon: SettingsIcon,
    },
    {
      title: 'Yordam',
      url: '/get-help',
      icon: HelpCircleIcon,
    },
    {
      title: 'Qidirish',
      url: '/search',
      icon: SearchIcon,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:p-1.5'
            >
              <a href='#'>
                <ArrowUpCircleIcon className='h-5 w-5' />
                <span className='text-base font-semibold'>LOGO</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
