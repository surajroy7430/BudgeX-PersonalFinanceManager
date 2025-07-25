import { memo, useCallback, useState } from "react";
import { useActions } from "@/hooks/use-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, TrendingDown, TrendingUp } from "lucide-react";
import TransactionForm from "@/components/transaction-form";

const AddTransaction = ({ type }) => {
  const { handleSubmit } = useActions();
  const [open, setOpen] = useState(false);

  const isIncome = type === "income";
  const label = isIncome ? "Add Income" : "Add Expense";
  const TrendIcon = isIncome ? TrendingUp : TrendingDown;
  const color = isIncome ? "text-emerald-600" : "text-destructive";

  const handleDispathSubmit = useCallback(
    (data) => handleSubmit({ ...data, type }, setOpen),
    [handleSubmit, type]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Plus size={15} /> {label}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-3 border-b flex gap-2">
            {label} <TrendIcon className={color} />
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {/* Form */}
        <TransactionForm
          type={type}
          handleDispathSubmit={handleDispathSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default memo(AddTransaction);
