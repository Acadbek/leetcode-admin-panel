import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";

export function NavMain({
  items
}) {
  return (
    (<SidebarGroup>
      <SidebarGroupContent className="flex flex-col">
        <SidebarMenu className="flex flex-col gap-3">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link to={item.url} className="flex items-center gap-2 w-full">
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon className="size-5" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>)
  );
}
