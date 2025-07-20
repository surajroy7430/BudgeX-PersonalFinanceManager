const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0];

  return (
    <div className="rounded-lg bg-muted px-4 py-2 shadow-md">
      <div className="text-xs font-semibold text-indigo-600">
        {item.payload.category || item.payload.source || item.name}
      </div>
      <div className="text-sm text-muted-foreground/70">
        Amount:{" "}
        <span className="font-medium text-muted-foreground">₹{item.value}</span>
      </div>
    </div>
  );
};

export default CustomTooltip;
