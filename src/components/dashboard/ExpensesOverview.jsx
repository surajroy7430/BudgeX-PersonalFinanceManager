import { memo, useMemo } from "react";
import {
  Card,
  CardAction,
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
import { formatCurrency } from "@/lib/financialUtils";
import ExpensesBarChart from "@/charts/ExpensesBarChart";

const days = 30;

const ExpensesOverview = () => {
  const { expenses } = useData();

  const filteredData = useMemo(
    () => getFilteredDataByDays(expenses, days),
    [expenses]
  );
  const totalAmount = useMemo(
    () => getTotalAmountForDays(expenses, days),
    [expenses]
  );

  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="text-lg">Expenses Breakdown</CardTitle>
        <CardDescription>Total expenses for Last {days} Days</CardDescription>

        <CardAction className="self-center text-center">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            ₹{formatCurrency(totalAmount)}
          </CardTitle>
          <CardDescription className="text-xs">Total Expenses</CardDescription>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ExpensesBarChart data={filteredData} />
      </CardContent>
    </Card>
  );
};

export default memo(ExpensesOverview);
