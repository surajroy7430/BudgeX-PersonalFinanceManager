import { memo, useMemo } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import {
  getFilteredDataByDays,
  getTotalAmountForDays,
} from "@/lib/financialUtils";
import { useData } from "@/hooks/use-data";
import IncomePieChart from "@/charts/IncomePieChart";

const COLORS = ["#047857", "#ea580c", "#6d28d9", "#dc2626", "#f59e0b"];
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
    <Card className="card">
      <CardHeader>
        <CardTitle className="text-lg">Income Overview</CardTitle>
        <CardDescription>Total Income for Last {days} Days</CardDescription>
      </CardHeader>

      <CardContent>
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
