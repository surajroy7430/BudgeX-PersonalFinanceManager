import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";
import TransactionInfoCard from "../../Cards/dashboard/TransactionInfoCard";
import AddExpense from "./AddExpense";

const ExpensesList = ({ transactions, onDelete, onDownload }) => {
  return (
    <Card className="card">
      <div className="flex flex-col lg:flex-row items-center justify-between px-6">
        <div className="text-center lg:text-left mb-3 lg:mb-0">
          <CardTitle className="text-lg">All Expenses</CardTitle>
        </div>

        <CardAction className="flex items-center self-center gap-2">
          <AddExpense />

          {transactions?.length > 0 && (
            <Button
              variant="outline"
              onClick={onDownload}
              className="hover:text-indigo-400"
            >
              <Download /> Download
            </Button>
          )}
        </CardAction>
      </div>

      <Separator />

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
