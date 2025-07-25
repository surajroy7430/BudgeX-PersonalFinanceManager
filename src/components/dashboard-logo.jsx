import { Link } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const smallLogo = "https://i.ibb.co/zhBGdXDW/small-logo.webp";
const largeLogo = "https://i.ibb.co/233vjvFm/large-logo.webp";

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
            <div
              className={`bg-transparent p-0.5 flex aspect-square items-center justify-center rounded-lg
              ${!open || isMobile ? "size-8" : "w-24"}`}
            >
              <img
                src={!open || isMobile ? smallLogo : largeLogo}
                alt="BX"
                className="h-full w-auto object-contain"
                loading="lazy"
              />
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
