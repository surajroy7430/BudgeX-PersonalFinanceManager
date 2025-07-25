import { memo, useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Bar, BarChart, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { getColorsByIndex } from "@/lib/colorByIndex";
import CustomTooltip from "@/charts/CustomTooltip";

const ExpensesBarChart = ({ data, mode }) => {
  const { theme } = useTheme();
  const tranformedData = useMemo(() => {
    if (mode === "grouped") {
      const grouped = {};

      data.forEach((entry) => {
        const date = entry.date;
        if (!grouped[date]) grouped[date] = { date };

        const key = entry.category || "Other";
        grouped[date][key] = (grouped[date][key] || 0) + entry.amount;
      });

      return Object.values(grouped);
    }

    return data.map((entry, index) => ({
      ...entry,
      id: `${entry.date} ${index}`,
      fill: getColorsByIndex(index),
    }));
  }, [data, mode]);

  const categories = useMemo(() => {
    if (mode !== "grouped") return [];
    const keys = new Set();

    data.forEach((entry) => keys.add(entry.category || "Other"));

    return Array.from(keys);
  }, [data, mode]);

  if (!data?.length) {
    return (
      <div className="text-center text-muted-foreground text-sm sm:text-base">
        No data to show. <br /> Add transactions to check the data.
      </div>
    );
  }

  return (
    <ChartContainer className="w-full aspect-square max-h-[380px]">
      <BarChart data={tranformedData} accessibilityLayer barSize="10%">
        <CartesianGrid vertical={false} />

        <XAxis dataKey="date" tick={false} tickMargin={10} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} />

        <ChartTooltip
          content={<CustomTooltip />}
          cursor={{ fill: "transparent" }}
        />

        {mode === "grouped" ? (
          categories.map((cat, idx) => (
            <Bar
              key={cat}
              dataKey={cat}
              stackId="a"
              fill={getColorsByIndex(idx)}
              radius={idx === 0 ? [0, 0, 0, 0] : [5, 5, 0, 0]}
              stroke={theme === "dark" ? "#1a1a1a" : "#fff"}
              strokeWidth={0.5}
            />
          ))
        ) : (
          <Bar dataKey="amount" radius={[5, 5, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColorsByIndex(index)} />
            ))}
          </Bar>
        )}
      </BarChart>
    </ChartContainer>
  );
};

export default memo(ExpensesBarChart);
