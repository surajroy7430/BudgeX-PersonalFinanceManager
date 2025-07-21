import {
  Card,
  CardAction,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FinancialAreaChart from "../../charts/FinancialAreaChart";
import { TrendingDown, TrendingUp } from "lucide-react";

const FinancialOverview = ({ transactions }) => {
  const incomeCount = transactions.filter((t) => t.type === "income").length;
  const expensesCount = transactions.filter(
    (t) => t.type === "expenses"
  ).length;

  return (
    <Card className="card">
      <div className="flex flex-col lg:flex-row items-center justify-between px-6">
        <CardTitle className="text-lg">Financial Overview</CardTitle>

        <CardAction className="self-center">
          <div className="flex w-full ml-auto">
            {["income", "expenses"].map((type, index) => {
              const isIncome = type === "income";

              return (
                <div
                  key={index}
                  className={`flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-center sm:px-4 sm:py-6 min-w-36 ${
                    index === 0 &&
                    "sm:border-r mt-2 sm:mt-0 border-gray-100 dark:border-border"
                    // : ""
                  }`}
                >
                  <span className="text-xs text-muted-foreground">
                    {isIncome ? "No of Income" : "No of Expenses"}
                  </span>
                  <span className="flex items-center justify-center gap-2 text-lg font-semibold leading-none sm:text-3xl">
                    {isIncome ? (
                      <>
                        <TrendingUp className="size-4 text-chart-2" />
                        {incomeCount}
                      </>
                    ) : (
                      <>
                        <TrendingDown className="size-4 text-destructive" />
                        {expensesCount}
                      </>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </CardAction>
      </div>

      <Separator />

      <CardContent>
        <FinancialAreaChart data={transactions} areaType="step" daysRange />
      </CardContent>
    </Card>
  );
};

export default FinancialOverview;
