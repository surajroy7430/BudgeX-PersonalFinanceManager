import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { useState, useMemo } from "react";
import { RANGE_OPTIONS, RANGE_OPTIONS_MAP } from "../constants";
import { isAfter, parse, subDays } from "date-fns";
import FinancialAreaChart from "./FinancialAreaChart";

const FinancialTypeOverviewChart = ({ transactions, type }) => {
  const [daysRange, setDaysRange] = useState("30d");

  const filteredData = useMemo(() => {
    const days = RANGE_OPTIONS[daysRange];
    const cutoffDate = subDays(new Date(), days);

    return transactions.filter((txn) => {
      const parsedDate = parse(txn.date, "dd MMM yyyy", new Date());

      return txn.type === type && isAfter(new Date(parsedDate), cutoffDate);
    });
  }, [transactions, type, daysRange]);

  return (
    <Card className="card">
      <div className="flex flex-col lg:flex-row items-center justify-between px-6">
        <div className="text-center lg:text-left mb-3 lg:mb-0">
          <CardTitle className="text-lg capitalize">{type} Overview</CardTitle>
          <CardDescription>
            Visual breakdown of {type} over selected time range.
          </CardDescription>
        </div>

        <CardAction className="self-center">
          <ToggleGroup
            type="single"
            value={daysRange}
            onValueChange={(val) => setDaysRange(val)}
            variant="outline"
            className="*:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            {RANGE_OPTIONS_MAP.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                aria-label={option.label}
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardAction>
      </div>

      <Separator />

      <CardContent>
        <FinancialAreaChart data={filteredData} areaType="natural" daysRange={daysRange} />
      </CardContent>
    </Card>
  );
};

export default FinancialTypeOverviewChart;
