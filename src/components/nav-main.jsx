import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavLink } from 'react-router-dom';

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col'>
        <SidebarMenu className='flex flex-col gap-3'>
          {items.map((item) => (
            <SidebarMenuItem
              className={item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              key={item.title}
            >
              <NavLink
                disabled={item.disabled}
                className={({ isActive }) =>
                  `flex items-center gap-2 w-full ${
                    isActive && !item.disabled
                      ? 'bg-gray-200 dark:bg-zinc-800 rounded-md'
                      : 'cursor-not-allowed'
                  }`
                }
                to={item.disabled ? '#' : item.url}
              >
                <SidebarMenuButton
                  disabled={item.disabled}
                  tooltip={item.title}
                >
                  {item.icon && <item.icon className='size-5' />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
