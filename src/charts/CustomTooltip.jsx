import { format } from "date-fns";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg bg-muted px-4 py-2 shadow-md flex flex-col gap-2">
      {payload?.map((entry, index) => {
        const { originalDate, date } = entry.payload || {};

        return (
          <div key={`tooptip-${index}`}>
            <div className="text-xs font-semibold text-muted-foreground/70">
              {date || (originalDate && format(new Date(originalDate), 'dd MMM yyyy'))}
            </div>
            <div
              className={`text-sm ${
                entry.payload.type === "income" || entry.name === "Income"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {entry.payload.category || entry.payload.source || entry.name}:{" "}
              <span className="font-medium text-muted-foreground">
                ₹{entry.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustomTooltip;
