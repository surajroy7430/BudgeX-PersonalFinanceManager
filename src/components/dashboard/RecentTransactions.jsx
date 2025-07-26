import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/hooks/use-data";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import PaginationControl from "@/components/pagination-control";
import TransactionInfoCard from "@/Cards/TransactionInfoCard";

const RecentTransactions = () => {
  const navigate = useNavigate();
  const { allTransactions: transactions } = useData();

  return (
    <Card>
      <div className="flex items-center justify-between px-6">
        <CardTitle>Recent Transactions</CardTitle>
        <CardAction>
          <Button
            variant="secondary"
            className="cursor-pointer"
            onClick={() => navigate("/expenses")}
          >
            See All <ArrowRight />
          </Button>
        </CardAction>
      </div>

      <Separator />

      <PaginationControl data={transactions}>
        {(paginatedData) => (
          <CardContent className="flex flex-col gap-4 min-h-[380px]">
            {paginatedData?.map((data) => (
              <TransactionInfoCard key={data.id} data={data} onEdit />
            ))}
          </CardContent>
        )}
      </PaginationControl>
    </Card>
  );
};

export default memo(RecentTransactions);
