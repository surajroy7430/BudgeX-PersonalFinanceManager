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

const FinancialAreaChart = ({ data }) => {
  const grouped = {};

  data.forEach((item) => {
    const parsedDate = parse(item.date, "dd MMM yyyy", new Date());
    const dateKey = format(parsedDate, "MMM d");

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

  const incomeCount = data.filter((item) => item.type === "income").length;
  const expenseCount = data.filter((item) => item.type === "expenses").length;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={stackedData} stackOffset="zero">
        <CartesianGrid stroke="none"/>

        <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis tick={false} />

        <Tooltip content={<CustomTooltip />} />

        <Area
          type='linear'
          dataKey="expenses"
          stackId="1"
          stroke="#dc2626"
          fill="#dc2626"
          fillOpacity={0.4}
          name="Expenses"
        />
        <Area
          type="linear"
          dataKey="income"
          stackId="1"
          stroke="#16a34a"
          fill="#16a34a"
          fillOpacity={0.2}
          name="Income"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default FinancialAreaChart;
