import { memo, useMemo } from "react";
import { Pie, PieChart, Cell, Label } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/financialUtils";
import CustomTooltip from "@/charts/CustomTooltip";

const IncomePieChart = ({ data, label, colors, totalAmount }) => {
  const labeledData = useMemo(() => {
    const countMap = {};
    return data.map((entry) => {
      const source = entry.source;
      const count = (countMap[source] || 0) + 1;
      countMap[source] = count;

      return {
        ...entry,
        displaySource: count > 1 ? `${source} (${count})` : source,
      };
    });
  }, [data]);

  const chartConfig = useMemo(() => {
    const config = {
      amount: { label: "Amount" },
    };

    return {
      config,
      ...Object.fromEntries(
        labeledData.map((entry, index) => [
          entry.displaySource,
          {
            label: entry.source,
            color: colors[index % colors.length],
          },
        ])
      ),
    };
  }, [labeledData]);

  if (!data?.length) {
    return (
      <div className="text-center text-muted-foreground text-sm sm:text-base">
        No data to show. <br /> Add transactions to check the data.
      </div>
    );
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[380px]"
    >
      <PieChart>
        <ChartTooltip
          content={<CustomTooltip />}
          cursor={{ fill: "transparent" }}
        />
        <ChartLegend
          content={
            <ChartLegendContent
              nameKey="displaySource"
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center mt-4"
            />
          }
          cursor={{ fill: "transparent" }}
        />
        <Pie
          data={labeledData}
          dataKey="amount"
          nameKey="displaySource"
          innerRadius="60%"
          outerRadius="80%"
          strokeWidth={0.5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          <Label
            content={({ viewBox }) => {
              if (!viewBox?.cy || !viewBox?.cy) return null;
              return (
                <text
                  x={viewBox.cx}
                  y={viewBox.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x={viewBox.cx}
                    className="fill-foreground text-xl sm:text-2xl font-bold"
                  >
                    ₹{formatCurrency(totalAmount)}
                  </tspan>
                  <tspan
                    x={viewBox.cx}
                    y={viewBox.cy + 20}
                    className="fill-muted-foreground/60 text-sm"
                  >
                    {label}
                  </tspan>
                </text>
              );
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default memo(IncomePieChart);
