import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import { compareAsc, format, parse } from "date-fns";

const FinancialAreaChart = ({ data, areaType, daysRange }) => {
  const grouped = {};

  data.forEach((item) => {
    const parsedDate = parse(item.date, "dd MMM yyyy", new Date());
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

  const stackedData = Object.values(grouped).sort((a, b) =>
    compareAsc(a.originalDate, b.originalDate)
  );

  const hasIncome = stackedData.some((d) => d.income > 0);
  const hasExpenses = stackedData.some((d) => d.expenses > 0);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={stackedData}
        stackOffset="zero"
        margin={{ top: 10, right: 10, bottom: 0, left: 20 }}
      >
        <CartesianGrid stroke="none" />

        <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} />

        <Tooltip content={<CustomTooltip />} />

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
            stackId="1"
            stroke="#dc2626"
            fill="url(#expensesGradient)"
            name="Expenses"
          />
        )}
        {hasIncome && (
          <Area
            type={areaType}
            dataKey="income"
            stackId="1"
            stroke="#16a34a"
            fill="url(#incomeGradient)"
            name="Income"
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default FinancialAreaChart;
