import { memo, useMemo } from "react";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import {
  getFilteredDataByDays,
  getTotalAmountForDays,
} from "@/lib/financialUtils";
import { useData } from "@/hooks/use-data";
import IncomePieChart from "@/charts/IncomePieChart";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];
const days = 60;

const IncomeOverview = () => {
  const { income } = useData();

  const filteredData = useMemo(
    () => getFilteredDataByDays(income, days),
    [income]
  );
  const totalAmount = useMemo(
    () => getTotalAmountForDays(income, days),
    [income]
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Income Overview</CardTitle>
        <CardDescription>Total Income for Last {days} Days</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <IncomePieChart
          data={filteredData}
          label="Total Income"
          colors={COLORS}
          totalAmount={totalAmount}
        />
      </CardContent>
    </Card>
  );
};

export default memo(IncomeOverview);
