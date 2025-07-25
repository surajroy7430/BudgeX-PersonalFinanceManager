import { memo } from "react";
import {
  Pie,
  PieChart,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/financialUtils";
import CustomTooltip from "@/charts/CustomTooltip";
import CustomLegend from "@/charts/CustomLegend";

const IncomePieChart = ({ data, label, colors, totalAmount }) => {
  if (!data?.length) {
    return (
      <div className="text-center text-muted-foreground text-sm sm:text-base">
        No data to show. <br /> Add transactions to check the data.
      </div>
    );
  }

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey={label === "Total Income" ? "source" : "category"}
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
            isAnimationActive
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute mb-10 inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-3xl font-bold text-foreground">
          ₹{formatCurrency(totalAmount)}
        </span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
};

export default memo(IncomePieChart);
