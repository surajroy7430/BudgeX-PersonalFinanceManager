import TransactionForm from "../transaction-form";
import { addExpense } from "../../features/expenses/expenseSlice";
import { useDispatch } from "react-redux";
import { CATEGORIES_OPTIONS } from "../../constants";

const ExpenseForm = () => {
  const dispatch = useDispatch();

  return (
    <TransactionForm
      type="expenses"
      fieldLabel="Category"
      submitLabel="Add Expense"
      options={CATEGORIES_OPTIONS}
      handleDispathSubmit={(data) => dispatch(addExpense(data))}
    />
  );
};

export default ExpenseForm;
