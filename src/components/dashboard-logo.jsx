import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function DashboardLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-primary p-0.5 flex aspect-square size-8 items-center justify-center rounded-lg">
            <img src="https://i.ibb.co/zhr9LyFG/small-logo.png" alt="BX" />
          </div>
          <div className="flex-1">
            <img
              src="https://i.ibb.co/ks7hX16j/logo-text.png"
              alt="BudgeX"
              className="h-5"
            />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
