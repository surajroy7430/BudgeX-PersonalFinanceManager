import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import TransactionInfoCard from "../../Cards/dashboard/TransactionInfoCard";

const ExpensesList = ({ transactions, onDelete, onDownload }) => {
  return (
    <Card className="card">
      <CardHeader>
        <CardTitle>All Expenses</CardTitle>
        <CardDescription />
        {transactions?.length > 0 && (
          <CardAction>
            <Button variant="outline" onClick={onDownload}>
              <Download /> Download
            </Button>
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense.id}
            icon={expense.icon}
            label={expense.category}
            amount={expense.amount.toLocaleString("en-IN")}
            date={expense.date}
            type={expense.type}
            onDelete={() => onDelete(expense)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ExpensesList;
