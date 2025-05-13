import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { useUser } from '@/hooks/queries/useUser';
import { Skeleton } from './ui/skeleton';

export function NavUser({ user, isLoading }) {
  const { isMobile } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              {isLoading ? (
                <>
                  <Skeleton className='h-8 w-8 rounded-lg grayscale' />
                  <Skeleton className='h-4 w-32 rounded-lg grayscale' />
                </>
              ) : (
                <Avatar className='h-8 w-8 rounded-lg grayscale'>
                  <AvatarImage
                    src={user?.avatar || './avatar.png'}
                    alt={user?.firstName + ' ' + user?.lastName || ''}
                  />
                  <AvatarFallback className='rounded-lg'>
                    {user?.firstName?.slice(0, 1).toUpperCase() +
                      user?.lastName?.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>
                  {user?.firstName + ' ' + user?.lastName || ''}
                </span>
                <span className='truncate text-xs text-muted-foreground'>
                  {user?.companyName || ''}
                </span>
              </div>
              <MoreVerticalIcon className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                {isLoading ? (
                  <>
                    <Skeleton className='h-8 w-8 rounded-lg grayscale' />
                    <Skeleton className='h-8 w-24 rounded-lg grayscale' />
                  </>
                ) : (
                  <>
                    <Avatar className='h-8 w-8 rounded-lg grayscale'>
                      <AvatarImage
                        src={user?.avatar || './avatar.png'}
                        alt={user?.firstName + ' ' + user?.lastName || ''}
                      />
                      <AvatarFallback className='rounded-lg'>
                        {user?.firstName?.slice(0, 1).toUpperCase() +
                          user?.lastName?.slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-medium'>
                        {user?.firstName + ' ' + user?.lastName || 'John Doe'}
                      </span>
                      <span className='truncate text-xs text-muted-foreground'>
                        {user?.companyName || 'Company Name'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to='/user/1' className='flex items-center gap-2 w-full'>
                <DropdownMenuItem className='w-full cursor-pointer'>
                  <UserCircleIcon size={16} />
                  Account
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
