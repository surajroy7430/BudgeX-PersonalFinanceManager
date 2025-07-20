"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "./ui/sidebar";

export function NavMain({ items }) {
  const { open } = useSidebar();
  const location = useLocation();

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              tooltip={{ children: item.title, hidden: open }}
              asChild
              isActive={isActive}
            >
              <Link to={item.path} className="py-6">
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
