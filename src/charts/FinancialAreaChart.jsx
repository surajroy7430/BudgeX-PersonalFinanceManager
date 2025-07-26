import { memo, useMemo } from "react";
import { AreaChart, Area, XAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { parseDate } from "@/lib/parseDate";
import { compareAsc, format } from "date-fns";
import CustomTooltip from "@/charts/CustomTooltip";

const FinancialAreaChart = ({ data, areaType, daysRange }) => {
  const stackedData = useMemo(() => {
    const grouped = {};

    data.forEach((item) => {
      const parsedDate = parseDate(item.date);
      const dateKey = format(parsedDate, daysRange === "7d" ? "EEE" : "MMM d");

      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          name: dateKey,
          income: 0,
          expenses: 0,
          originalDate: parsedDate,
        };
      }

      if (item.type === "income") {
        grouped[dateKey].income += item.amount;
      } else if (item.type === "expenses") {
        grouped[dateKey].expenses += item.amount;
      }
    });

    return Object.values(grouped).sort((a, b) =>
      compareAsc(a.originalDate, b.originalDate)
    );
  }, [data, daysRange]);

  const hasIncome = useMemo(
    () => stackedData.some((d) => d.income > 0),
    [stackedData]
  );
  const hasExpenses = useMemo(
    () => stackedData.some((d) => d.expenses > 0),
    [stackedData]
  );

  return (
    <ChartContainer className="aspect-auto h-[300px] w-full">
      <AreaChart data={stackedData} margin={{ left: 15, right: 15 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: "11px" }}
          tickMargin={8}
          minTickGap={32}
        />
        <ChartTooltip content={<CustomTooltip />} cursor={false} />

        <defs>
          {hasExpenses && (
            <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1} />
            </linearGradient>
          )}
          {hasIncome && (
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1} />
            </linearGradient>
          )}
        </defs>

        {hasExpenses && (
          <Area
            type={areaType}
            dataKey="expenses"
            stackId="a"
            stroke="#dc2626"
            fill="url(#expensesGradient)"
            name="Expenses"
          />
        )}
        {hasIncome && (
          <Area
            type={areaType}
            dataKey="income"
            stackId="a"
            stroke="#16a34a"
            fill="url(#incomeGradient)"
            name="Income"
          />
        )}
      </AreaChart>
    </ChartContainer>
  );
};

export default memo(FinancialAreaChart);
