import { memo } from "react";
import { Upload } from "lucide-react";
import { useActions } from "@/hooks/use-actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardTitle, CardAction } from "@/components/ui/card";
import AddTransaction from "@/components/add-transaction";
import TransactionInfoCard from "@/Cards/TransactionInfoCard";
import PaginationControl from "@/components/pagination-control";

const TransactionList = ({ data, type }) => {
  if (!data) return null;
  const { handleDownload } = useActions();

  const isIncome = type === "income";
  const title = isIncome ? "Income Sources" : "All Expenses";

  return (
    <Card className="card">
      <div className="flex flex-col lg:flex-row items-center justify-between px-6">
        <div className="text-center lg:text-left mb-3 lg:mb-0">
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>

        <CardAction className="flex items-center gap-2">
          <AddTransaction type={type} />

          {data.length > 0 && (
            <Button
              variant="outline"
              onClick={() => handleDownload(type)}
              className="hover:text-primary"
            >
              <Upload /> Export
            </Button>
          )}
        </CardAction>
      </div>

      <Separator />

      <PaginationControl data={data}>
        {(paginatedData) => (
          <CardContent className="flex flex-col gap-4">
            {paginatedData?.map((item) => (
              <TransactionInfoCard key={item.id} data={item} onEdit />
            ))}
          </CardContent>
        )}
      </PaginationControl>
    </Card>
  );
};

export default memo(TransactionList);
