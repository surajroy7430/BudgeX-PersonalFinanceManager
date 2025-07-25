import { memo, useCallback } from "react";
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
import CustomTooltip from "@/charts/CustomTooltip";

const ExpensesBarChart = ({ data }) => {
  const barColor = useCallback(
    (index) => (index % 2 === 0 ? "#4338ca" : "#6366f1"),
    []
  );

  if (!data?.length) {
    return (
      <div className="text-center text-muted-foreground text-sm sm:text-base">
        No data to show. <br /> Add transactions to check the data.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barSize={50}>
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

export default memo(ExpensesBarChart);
