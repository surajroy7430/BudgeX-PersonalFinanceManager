import { format } from "date-fns";
import { formatCurrency } from "@/lib/financialUtils";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const { date, originalDate } = payload[0]?.payload || {};
  const resolvedDate =
    date || (originalDate && format(new Date(originalDate), "dd MMM yyyy"));

  return (
    <div className="rounded-lg bg-background border px-2.5 py-1.5 grid items-start gap-1.5  min-w-[8rem] text-xs shadow-xl">
      <div className="text-xs font-semibold text-muted-foreground/70">
        {resolvedDate}
      </div>
      
      <div className="grid gap-1.5">
        {payload?.map((entry, index) => {
          const { source, displaySource, category, fill } = entry.payload || {};
          const { name, value, color } = entry || "Value";

          const label =
            category || source || displaySource || name || "Unknown";
          const indicatorColor = fill || color || "#ccc";

          return (
            <div
              key={`tooptip-${index}`}
              className="flex w-full flex-col items-stretch gap-1.5"
            >
              {/* Row with indicator + label + amount */}
              <div className="flex items-center justify-between leading-none gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className="shrink-0 h-2.5 w-2.5 rounded-xs"
                    style={{ background: indicatorColor }}
                  />
                  <span className="text-muted-foreground">{label}</span>
                </div>

                <span className="text-foreground/80 font-medium tabular-nums">
                  ₹{formatCurrency(value)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomTooltip;
