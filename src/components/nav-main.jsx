import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, NavLink } from "react-router-dom";

export function NavMain({
  items
}) {
  return (
    (<SidebarGroup>
      <SidebarGroupContent className="flex flex-col">
        <SidebarMenu className="flex flex-col gap-3">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-2 w-full ${isActive ? "bg-gray-100 rounded-md" : ""}`
                }
                to={item.url}>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon className="size-5" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>)
  );
}
