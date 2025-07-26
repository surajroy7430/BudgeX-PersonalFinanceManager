import { memo, useMemo } from "react";
import { useData } from "@/hooks/use-data";
import { Separator } from "@/components/ui/separator";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card className="pt-0">
      <CardHeader className="flex flex-col items-stretch lg:flex-row space-y-0 border-b [.border-b]:p-0">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>
            Showing total transactions of all time
          </CardDescription>
        </div>

        <div className="flex">
          {dataSummary.map(({ label, count, Icon, iconColor }) => (
            <div
              key={label}
              className={`flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-center sm:px-8 sm:py-6 
                even:border-l lg:border-l lg:border-t-0 `}
            >
              <span className="text-xs text-muted-foreground">{label}</span>
              <span className="flex items-center justify-center gap-2 text-lg font-semibold leading-none sm:text-3xl">
                <Icon className={`size-4 ${iconColor}`} />
                {count}
              </span>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
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
