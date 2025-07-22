import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { deleteIncome } from "../../features/income/incomeSlice";
import { deleteExpense } from "../../features/expenses/expenseSlice";
import AllTransactionsCard from "../../Cards/dashboard/AllTransactionsCard";
import { useEffect, useState } from "react";
import PaginationControl from "../pagination-control";

const RecentTransactions = ({ transactions }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const totalPages = Math.ceil(transactions.length / pageSize);

  const handleDelete = (transaction) => {
    if (transaction.type === "income") {
      dispatch(deleteIncome(transaction.id));
    } else if (transaction.type === "expenses") {
      dispatch(deleteExpense(transaction.id));
    }
  };

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
        {paginatedTransactions?.map((t) => (
          <AllTransactionsCard
            key={t.id}
            icon={t.icon}
            label={t.type === "income" ? t.source : t.category}
            amount={t.amount.toLocaleString("en-IN")}
            date={t.date}
            type={t.type}
            paymentMethod={t.paymentMethod}
            description={t.description}
            onDelete={() => handleDelete(t)}
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

export default RecentTransactions;
