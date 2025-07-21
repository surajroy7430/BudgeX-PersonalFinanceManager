import {
  Pie,
  PieChart,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import { differenceInDays, parse } from "date-fns";
import CustomLegend from "./CustomLegend";

const FinancialPieChart = ({ data, label, totalAmount, colors, days }) => {
  const today = new Date();

  // parse and filter last 30 Days
  const filteredData = data
    .map((item) => ({
      ...item,
      parsedDate: parse(item.date, "dd MMM yyyy", new Date()),
    }))
    .filter((item) => differenceInDays(today, item.parsedDate) <= days);

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={filteredData}
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
          ₹{totalAmount.toLocaleString("en-IN")}
        </span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
};

export default FinancialPieChart;
