import TransactionForm from "../transaction-form";
import { addExpense } from "../../features/expenses/expenseSlice";
import { useDispatch } from "react-redux";

const ExpenseForm = () => {
  const dispatch = useDispatch();

  return (
    <TransactionForm
      type="expenses"
      fieldLabel="Category"
      submitLabel="Add Expense"
      handleDispathSubmit={(data) => dispatch(addExpense(data))}
    />
  );
};

export default ExpenseForm;
