import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Download, Plus, TrendingDown } from "lucide-react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  downloadExpenses,
  getExpenses,
} from "../features/expenses/expenseSlice";

const ExpensePage = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);
  const totalExpenses = useSelector((state) => state.expenses.totalExpenses);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  return (
    <div>
      <Dialog>
        <DialogTrigger className="dialog-trigger hover:text-red-400">
          <Plus size={15} /> Add Expense
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="pb-3 border-b flex gap-2">
              Add Expense <TrendingDown className="text-red-500" />
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <ExpenseForm />
        </DialogContent>
      </Dialog>

      <Button variant="outline" onClick={() => dispatch(downloadExpenses())}>
        <Download /> Download
      </Button>
    </div>
  );
};

export default ExpensePage;
