import { toast } from "sonner";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { capitalize } from "@/lib/financialUtils";
import {
  addIncome,
  deleteIncome,
  downloadIncome,
} from "@/features/income/incomeSlice";
import {
  addExpense,
  deleteExpense,
  downloadExpenses,
} from "@/features/expenses/expenseSlice";

export const useActions = () => {
  const dispatch = useDispatch();

  const submitMap = {
    income: (data) => dispatch(addIncome(data)),
    expenses: (data) => dispatch(addExpense(data)),
  };

  const downloadMap = {
    income: () => dispatch(downloadIncome()),
    expenses: () => dispatch(downloadExpenses()),
  };

  const deleteMap = {
    income: (id) => dispatch(deleteIncome(id)),
    expenses: (id) => dispatch(deleteExpense(id)),
  };

  // Handle Submit
  const handleSubmit = useCallback(
    (data, setOpen) => {
      const submitFn = submitMap[data.type];

      if (!submitFn) {
        toast.error("Invalid download type");
        return;
      }

      try {
        submitFn(data);

        setOpen(false);
        toast.success(
          `${
            data.type === "income" ? "Income" : "Expense"
          } added successfully!`,
          {
            duration: 1500,
          }
        );
      } catch (error) {
        toast.error("Failed to add transaction");
      }
    },
    [dispatch]
  );

  // Handle Download
  const handleDownload = useCallback(
    (type) => {
      const downloadFn = downloadMap[type];

      if (!downloadFn) {
        toast.error("Invalid export type");
        return;
      }

      try {
        downloadFn();
        toast.success("Exporting...", { duration: 1500 });
      } catch (error) {
        toast.error("Export failed");
      }
    },
    [dispatch]
  );

  // Handle Delete
  const handleDelete = useCallback(
    (data) => {
      const deleteFn = deleteMap[data.type];

      if (!deleteFn) {
        toast.error("Invalid transaction type");
        return;
      }

      try {
        deleteFn(data.id);
        toast.success("Transaction deleted!", { duration: 1500 });
      } catch (error) {
        toast.error("Failed to delete transaction");
      }
    },
    [dispatch]
  );

  return { handleSubmit, handleDelete, handleDownload };
};
