import { Card, CardAction, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { deleteIncome } from "../../features/income/incomeSlice";
import { deleteExpense } from "../../features/expenses/expenseSlice";
import TransactionInfoCard from "../../Cards/dashboard/TransactionInfoCard";

const RecentTransactions = ({ transactions }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (transaction) => {
    if (transaction.type === "income") {
      dispatch(deleteIncome(transaction.id));
    } else if (transaction.type === "expenses") {
      dispatch(deleteExpense(transaction.id));
    }
  };

  return (
    <Card className="card">
      <div className="flex items-center justify-between px-6">
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
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

      <CardContent className="flex flex-col gap-4">
        {transactions?.slice(0, 5)?.map((t) => (
          <TransactionInfoCard
            key={t.id}
            icon={t.icon}
            label={t.type === "income" ? t.source : t.category}
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

export default RecentTransactions;
