import { differenceInDays, parse } from "date-fns";
import {
  Bar,
  BarChart,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  Cell,
  YAxis,
  CartesianGrid,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const FinancialBarChart = ({ data, days }) => {
  const today = new Date();

  // parse and filter last 30 Days
  const daysData = data
    .map((item) => ({
      ...item,
      parsedDate: parse(item.date, "dd MMM yyyy", new Date()),
    }))
    .filter((item) => differenceInDays(today, item.parsedDate) <= days);

  const barColor = (index) => (index % 2 === 0 ? "#4338ca" : "#6366f1");

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={daysData} barSize={50}>
        <XAxis dataKey="date" tick={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid stroke="none" />

        <Bar dataKey="amount" fill="#4338ca" radius={[5, 5, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColor(index)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FinancialBarChart;
