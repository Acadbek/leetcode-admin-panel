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
import { useUser } from '@/hooks/queries/useUser';

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
      disabled: false,
    },
    {
      title: 'Company',
      url: '/company',
      icon: ListIcon,
      disabled: false,
    },
    {
      title: 'Groups',
      url: '/groups',
      icon: ListIcon,
      disabled: false,
    },
    {
      title: 'Users',
      url: '/users',
      icon: ListIcon,
      disabled: false,
    },
    {
      title: 'Masalalar',
      url: '/problems',
      icon: Code,
      disabled: false,
    },
    {
      title: 'Musobaqalar',
      url: '/contests',
      icon: PartyPopper,
      disabled: true,
    },
    {
      title: 'Yordam va Shikoyatlar',
      url: '/help',
      icon: MessageCircleQuestion,
      disabled: true,
    },
    {
      title: 'Blog / Yangiliklar',
      url: '/blog',
      icon: Rss,
      disabled: true,
    },
    {
      title: 'Analitika',
      url: '/analytics',
      icon: ChartNoAxesCombined,
      disabled: true,
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
      disabled: true,
    },
    {
      title: 'Yordam',
      url: '/get-help',
      icon: HelpCircleIcon,
      disabled: true,
    },
    {
      title: 'Qidirish',
      url: '/search',
      icon: SearchIcon,
      disabled: true,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { data: user, isLoading, error, isError } = useUser();
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
        <NavUser isLoading={isLoading} user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
