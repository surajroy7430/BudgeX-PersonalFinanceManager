import { memo, useMemo } from "react";
import { useData } from "@/hooks/use-data";
import { Separator } from "@/components/ui/separator";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import FinancialAreaChart from "@/charts/FinancialAreaChart";

const FinancialOverview = () => {
  const { allTransactions: transactions } = useData();

  const incomeCount = useMemo(
    () => transactions.filter((t) => t.type === "income").length,
    [transactions]
  );
  const expensesCount = useMemo(
    () => transactions.filter((t) => t.type === "expenses").length,
    [transactions]
  );

  const dataSummary = [
    {
      label: "No of Income",
      count: incomeCount,
      Icon: TrendingUp,
      iconColor: "text-emerald-600",
    },
    {
      label: "No of Expenses",
      count: expensesCount,
      Icon: TrendingDown,
      iconColor: "text-destructive",
    },
  ];

  return (
    <Card className="card">
      <div className="flex flex-col lg:flex-row items-center justify-between px-6">
        <CardTitle className="text-lg">Financial Overview</CardTitle>

        <CardAction className="self-center">
          <div className="flex w-full ml-auto">
            {dataSummary.map(({ label, count, Icon, iconColor }, index) => (
              <div
                key={label}
                className={`flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-center sm:px-4 sm:py-6 min-w-36 ${
                  index === 0
                    ? "sm:border-r mt-2 border-gray-100 dark:border-border"
                    : "mt-2"
                }`}
              >
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="flex items-center justify-center gap-2 text-lg font-semibold leading-none sm:text-3xl">
                  <Icon className={`size-4 ${iconColor}`} />
                  {count}
                </span>
              </div>
            ))}
          </div>
        </CardAction>
      </div>

      <Separator />

      <CardContent>
        {transactions.length > 0 ? (
          <FinancialAreaChart data={transactions} areaType="step" daysRange />
        ) : (
          <div className="text-center text-muted-foreground text-sm sm:text-base">
            No data to show. <br /> Add transactions to check the data.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(FinancialOverview);
