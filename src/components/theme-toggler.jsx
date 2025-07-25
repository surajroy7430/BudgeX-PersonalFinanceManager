import { memo, useCallback, useId } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeToggler = () => {
  const id = useId();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = useCallback(() => toggleTheme(), [toggleTheme]);

  return (
    <div>
      <div className="relative inline-grid h-6 grid-cols-2 items-center text-sm font-medium">
        <Switch
          id={id}
          checked={isDark}
          onCheckedChange={handleToggle}
          className="absolute inset-0 h-[inherit] w-auto [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-all [&_span]:duration-200 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
        />
        <span className="pointer-events-none relative ms-0.5 flex min-w-6 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=unchecked]:translate-x-full peer-data-[state=checked]:invisible  peer-data-[state=unchecked]:rtl:-translate-x-full">
          <SunIcon size={16} aria-hidden="true" />
        </span>
        <span className="pointer-events-none relative me-0.5 flex min-w-6 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
          <MoonIcon size={16} aria-hidden="true" />
        </span>
      </div>
      <Label htmlFor={id} className="sr-only">
        Theme Toggle
      </Label>
    </div>
  );
};

export default memo(ThemeToggler);
