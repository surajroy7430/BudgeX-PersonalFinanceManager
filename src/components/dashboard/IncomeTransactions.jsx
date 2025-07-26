import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useData } from "@/hooks/use-data";
import { useActions } from "@/hooks/use-actions";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import TransactionInfoCard from "@/Cards/TransactionInfoCard";

const IncomeTransactions = () => {
  const { income } = useData();
  const { handleDelete } = useActions();
  const navigate = useNavigate();

  return (
    <Card className="card">
      <div className="px-6 flex items-center justify-between">
        <CardTitle className="text-lg">Recent Income</CardTitle>
        <CardAction>
          <Button
            variant="secondary"
            className="cursor-pointer"
            onClick={() => navigate("/income")}
          >
            See All <ArrowRight />
          </Button>
        </CardAction>
      </div>
      
      <CardContent className="flex flex-col gap-4 min-h-[380px]">
        {income?.slice(0, 5)?.map((icm) => (
          <TransactionInfoCard
            key={icm.id}
            data={icm}
            showMethod={false}
            showDescription={false}
            onDelete={() => handleDelete(icm)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default memo(IncomeTransactions);
