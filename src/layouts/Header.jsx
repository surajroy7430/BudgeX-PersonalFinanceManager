import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 mb-4 border-b flex h-16 shrink-0 items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        {/* <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        /> */}

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="flex">
            <a
              href="https://github.com/surajroy7430/BudgeX-PersonalFinanceManager"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
