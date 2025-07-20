import { useEffect, useId, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggler() {
  const id = useId();
  const { theme, toggleTheme } = useTheme();
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    setChecked(theme === "light");
  }, [theme]);

  const handleToggle = (val) => {
    setChecked(val);
    toggleTheme();
  };

  return (
    <div>
      <div className="relative inline-grid h-6 grid-cols-2 items-center text-sm font-medium">
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={handleToggle}
          className="peer data-[state=checked]:bg-input/70  absolute inset-0 h-[inherit] w-auto [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
        />
        <span className="pointer-events-none relative ms-0.5 flex min-w-6 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
          <MoonIcon size={16} aria-hidden="true" />
        </span>
        <span className="peer-data-[state=checked]:text-black/60 pointer-events-none relative me-0.5 flex min-w-6 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
          <SunIcon size={16} aria-hidden="true" />
        </span>
      </div>
      <Label htmlFor={id} className="sr-only">
        Theme Toggle
      </Label>
    </div>
  );
}
