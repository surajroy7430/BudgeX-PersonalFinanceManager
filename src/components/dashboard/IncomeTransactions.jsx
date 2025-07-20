import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { deleteIncome } from "../../features/income/incomeSlice";
import TransactionInfoCard from "../../Cards/dashboard/TransactionInfoCard";

const IncomeTransactions = ({ transactions }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (transaction) => {
    dispatch(deleteIncome(transaction.id));
  };
  return (
    <Card className="card">
      <div className="px-6 flex items-center justify-between">
        <CardTitle className="text-lg">Income</CardTitle>
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
      <CardContent className="flex flex-col gap-4">
        {transactions?.slice(0, 5)?.map((t) => (
          <TransactionInfoCard
            key={t.id}
            icon={t.icon}
            label={t.source}
            amount={t.amount.toLocaleString("en-IN")}
            date={t.date}
            type={t.type}
            onDelete={() => handleDelete(t)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default IncomeTransactions;
