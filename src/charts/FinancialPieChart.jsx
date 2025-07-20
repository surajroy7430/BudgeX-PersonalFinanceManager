import {
  Pie,
  PieChart,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const FinancialPieChart = ({ data, label, totalAmount, showTextAnchor=true }) => {
  const allZero = data.every((item) => item.amount === 0);

  return (
    <>
      {allZero ? (
        <div className="flex h-72 items-center justify-center text-muted-foreground">
          No financial data to display
        </div>
      ) : (
        <div className="relative">
          <ResponsiveContainer width="100%" height={380}>
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={100}
                labelLine={false}
                isAnimationActive
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>

              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" iconType="circle" iconSize={12} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute mb-6 inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-3xl font-bold text-foreground">
              ₹{totalAmount.toLocaleString("en-IN")}
            </span>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default FinancialPieChart;
