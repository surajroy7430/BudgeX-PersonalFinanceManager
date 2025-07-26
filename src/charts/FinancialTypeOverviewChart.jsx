import { useState, useMemo, memo } from "react";
import { parseDate } from "@/lib/parseDate";
import { isAfter, subDays } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RANGE_OPTIONS, RANGE_OPTIONS_MAP } from "@/constants";
import FinancialAreaChart from "@/charts/FinancialAreaChart";
import AddTransaction from "@/components/add-transaction";

const FinancialTypeOverviewChart = ({ transactions, type }) => {
  const [daysRange, setDaysRange] = useState("30d");

  const addTransaction =
    type === "income" ? (
      <AddTransaction type={type} />
    ) : (
      <AddTransaction type={type} />
    );

  const filteredData = useMemo(() => {
    const days = RANGE_OPTIONS[daysRange];
    const cutoffDate = subDays(new Date(), days);

    return transactions.filter((txn) => {
      const parsedDate = parseDate(txn.date);

      return txn.type === type && isAfter(new Date(parsedDate), cutoffDate);
    });
  }, [transactions, type, daysRange]);

  return (
    <Card>
      <CardHeader className="flex flex-col lg:flex-row items-stretch border-b px-6">
        <div className="flex flex-1 flex-col justify-center">
          <CardTitle className="capitalize">{type} Overview</CardTitle>
          <CardDescription>
            Visual breakdown of {type} over selected time range.
          </CardDescription>
        </div>

        <CardAction>
          {transactions.length > 0 ? (
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
                  className=""
                >
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          ) : (
            addTransaction
          )}
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {transactions.length > 0 ? (
          <FinancialAreaChart
            data={filteredData}
            areaType="natural"
            daysRange={daysRange}
          />
        ) : (
          <div className="text-center text-muted-foreground text-sm sm:text-base">
            No data to show. <br /> Add {type} to check the data.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(FinancialTypeOverviewChart);
