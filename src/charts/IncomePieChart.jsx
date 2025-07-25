import { memo, useMemo } from "react";
import { Pie, PieChart, Cell, Label } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/financialUtils";
import { getColorsByIndex } from "@/lib/colorByIndex";
import CustomTooltip from "@/charts/CustomTooltip";

const IncomePieChart = ({ data, totalAmount }) => {
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
            color: getColorsByIndex(index),
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
              className="-translate-y-1.5 flex-wrap gap-1.5 *:basis-1/4 *:justify-center mt-4"
            />
          }
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
            <Cell key={`cell-${index}`} fill={getColorsByIndex(index)} />
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
                    Total Income
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
