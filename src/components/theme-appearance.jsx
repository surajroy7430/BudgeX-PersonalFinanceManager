import { memo, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ThemeAppearance = () => {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h5 className="text-sm font-medium">Theme</h5>
        <p className="text-sm text-muted-foreground">
          Select the theme for the app
        </p>

        <RadioGroup
          value={selectedTheme}
          onValueChange={(val) => setSelectedTheme(val)}
          className="flex flex-wrap justify-center md:justify-start gap-5 pt-2"
        >
          <div>
            <Label className="flex flex-col [&:has([data-state=checked])>div]:border-primary">
              <RadioGroupItem value="light" className="sr-only" />
              <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <p className="!block w-full p-2 text-center font-normal">Light</p>
            </Label>
          </div>

          <div>
            <Label className="flex flex-col [&:has([data-state=checked])>div]:border-primary">
              <RadioGroupItem value="dark" className="sr-only" />
              <div className="rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <p className="!block w-full p-2 text-center font-normal">Dark</p>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        type="button"
        onClick={() => setTheme(selectedTheme)}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer max-w-[250px] w-full"
      >
        Update Preference
      </Button>
    </div>
  );
};

export default memo(ThemeAppearance);
