import { Spinner } from "@rsuite/icons";

export const PageLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="flex flex-col gap-2 items-center">
      <Spinner pulse className="text-muted-foreground text-4xl" />
      <p className="text-muted-foreground/80 text-sm">Loading...</p>
    </div>
  </div>
);
