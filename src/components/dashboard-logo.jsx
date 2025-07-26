import { Link } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const smallLogo = "https://i.ibb.co/zhBGdXDW/small-logo.webp";
const largeLogo = "https://i.ibb.co/233vjvFm/large-logo.webp";
const textLogo = "https://i.ibb.co/4nv1dZn3/logo-text.webp";

export function DashboardLogo() {
  const { open, isMobile, toggleSidebar } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link
          to="/dashboard"
          onClick={() => {
            if (isMobile) toggleSidebar();
          }}
        >
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="bg-secondary p-0.5 flex aspect-square size-8 items-center justify-center rounded-lg">
              <img
                src={smallLogo}
                alt="BX"
                className="h-full w-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="flex-1">
              <img
                src={textLogo}
                alt="BudgeX"
                className="h-4 w-auto object-contain"
                loading="lazy"
              />
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
