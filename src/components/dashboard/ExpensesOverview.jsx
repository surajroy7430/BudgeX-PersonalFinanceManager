import { memo, useMemo, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  getFilteredDataByDays,
  getTotalAmountForDays,
} from "@/lib/financialUtils";
import { useData } from "@/hooks/use-data";
import { formatCurrency } from "@/lib/financialUtils";
import ExpensesBarChart from "@/charts/ExpensesBarChart";

const days = 30;

const ExpensesOverview = () => {
  const { expenses } = useData();
  const [viewMode, setViewMode] = useState("single");

  const filteredData = useMemo(
    () => getFilteredDataByDays(expenses, days),
    [expenses]
  );
  const totalAmount = useMemo(
    () => getTotalAmountForDays(expenses, days),
    [expenses]
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses Breakdown</CardTitle>
        <CardDescription>Total expenses for Last {days} Days</CardDescription>

        <CardAction className="text-center">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            ₹{formatCurrency(totalAmount)}
          </CardTitle>
          <CardDescription className="text-xs">Total Expenses</CardDescription>
        </CardAction>
      </CardHeader>

      {/* Chart */}
      <CardContent className="flex-1 pb-0">
        <ExpensesBarChart data={filteredData} mode={viewMode} />
      </CardContent>

      {/* Mode Selector */}
      <CardFooter className="justify-center">
        <Select value={viewMode} onValueChange={setViewMode}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="View Mode" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="grouped">Grouped</SelectItem>
          </SelectContent>
        </Select>
      </CardFooter>
    </Card>
  );
};

export default memo(ExpensesOverview);
