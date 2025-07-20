const CustomLegend = ({ payload }) => {
  if (!payload?.length) return null;

  return (
    <div className="mx-6 space-y-2 text-sm">
      {payload?.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ background: entry.color }}
            ></span>
            <span className="text-muted-foreground">{entry.value}</span>
          </div>
          <span className="text-foreground font-medium">₹{entry.payload.amount.toLocaleString("en-IN")}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
