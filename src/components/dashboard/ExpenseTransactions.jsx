import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/hooks/use-data";
import { useActions } from "@/hooks/use-actions";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import TransactionInfoCard from "@/Cards/TransactionInfoCard";

const ExpenseTransactions = () => {
  const { expenses } = useData();
  const { handleDelete } = useActions();
  const navigate = useNavigate();

  return (
    <Card className="card">
      <div className="px-6 flex items-center justify-between">
        <CardTitle className="text-lg">Recent Expenses</CardTitle>
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

      <CardContent className="flex flex-col gap-4 min-h-[380px]">
        {expenses?.slice(0, 5)?.map((exp) => (
          <TransactionInfoCard
            key={exp.id}
            data={exp}
            showMethod={false}
            showDescription={false}
            onDelete={() => handleDelete(exp)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default memo(ExpenseTransactions);
