import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ThemeAppearance from "@/components/theme-appearance";

const Appearance = () => {
  return (
    <Card className="shadow-none border-none text-center md:text-left">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Appearance</CardTitle>
        <CardDescription>
          Customize the appearance of the app. Automatically switch between
          light and dark themes.
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent>
        <ThemeAppearance />
      </CardContent>
    </Card>
  );
};

export default Appearance;
