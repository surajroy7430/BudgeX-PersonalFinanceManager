import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, TrendingDown } from "lucide-react";
import ExpenseForm from "./ExpenseForm";

const AddExpense = () => {
  return (
    <Dialog>
      <DialogTrigger className="dialog-trigger hover:text-red-400">
        <Plus size={15} /> Add Expense
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-3 border-b flex gap-2">
            Add Expense <TrendingDown className="text-red-500" />
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <ExpenseForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddExpense;
