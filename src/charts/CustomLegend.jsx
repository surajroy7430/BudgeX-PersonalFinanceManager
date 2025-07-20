const CustomLegend = ({ payload }) => {
  if (!payload?.length) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 space-y-6 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full top-5"
            style={{ background: entry.color }}
          ></div>
          <span className="text-sm font-medium text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
