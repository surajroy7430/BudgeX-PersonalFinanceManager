import { Command, Goal, HandCoins, WalletMinimal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { DashboardLogo } from "./dashboard-logo";

const menuButtons = {
  navMain: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Command,
    },
    {
      title: "Income",
      path: "/income",
      icon: WalletMinimal,
    },
    {
      title: "Expense",
      path: "/expenses",
      icon: HandCoins,
    },
    // {
    //   title: "Goals",
    //   path: "/goals",
    //   icon: Goal,
    // },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent className="mx-2 mt-4">
        <NavMain items={menuButtons.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
