"use client";

import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const { open, isMobile, toggleSidebar } = useSidebar();
  const location = useLocation();

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              tooltip={{ children: item.title, hidden: open }}
              className="transition-colors hover:bg-transparent"
            >
              <Link
                to={item.path}
                className="py-6 flex items-center gap-3 w-full"
                onClick={() => {
                  if (isMobile) toggleSidebar();
                }}
              >
                {item.icon && (
                  <item.icon
                    size={22}
                    aria-hidden="true"
                    className="transition-colors"
                  />
                )}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
