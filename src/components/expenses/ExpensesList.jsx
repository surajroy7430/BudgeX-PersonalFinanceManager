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
import AllTransactionsCard from "../../Cards/dashboard/AllTransactionsCard";
import AddExpense from "./AddExpense";
import { useEffect, useState } from "react";
import PaginationControl from "../pagination-control";

const ExpensesList = ({ transactions, onDelete, onDownload }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = Math.ceil(transactions.length / pageSize);

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Reset to page 1 if page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

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

      <CardContent className="flex flex-col gap-4">
        {paginatedTransactions.map((expense) => (
          <AllTransactionsCard
            key={expense.id}
            icon={expense.icon}
            label={expense.category}
            amount={expense.amount.toLocaleString("en-IN")}
            date={expense.date}
            type={expense.type}
            paymentMethod={expense.paymentMethod}
            description={expense.description}
            onDelete={() => onDelete(expense)}
            onEdit
          />
        ))}
      </CardContent>

      <Separator />

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
      )}
    </Card>
  );
};

export default ExpensesList;
