import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddIncome from "./AddIncome";

const IncomeOverviewChart = () => {
  return (
    <Card className="card">
      <CardHeader>
        <CardTitle>Income Sources</CardTitle>
        <CardDescription />
        <CardAction>
          <AddIncome />
        </CardAction>
      </CardHeader>

      <CardContent></CardContent>
    </Card>
  );
};

export default IncomeOverviewChart;
