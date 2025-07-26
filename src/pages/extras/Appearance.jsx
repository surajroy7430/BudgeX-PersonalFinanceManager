import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ThemeAppearance from "@/components/theme-appearance";

const Appearance = () => {
  return (
    <Card className="text-center md:text-left">
      <CardHeader className="border-b px-4 sm:px-6">
        <CardTitle>Appearance</CardTitle>
        <CardDescription className="flex flex-col justify-center md:justify-start text-sm">
          <span>Customize the appearance of the app.&nbsp;</span>
          <span>Automatically switch between light and dark themes.</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 sm:px-6">
        <ThemeAppearance />
      </CardContent>
    </Card>
  );
};

export default Appearance;
