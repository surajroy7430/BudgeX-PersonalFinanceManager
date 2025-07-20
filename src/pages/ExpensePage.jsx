import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExpense,
  downloadExpenses,
  getExpenses,
} from "../features/expenses/expenseSlice";
import ExpensesList from "../components/expenses/ExpensesList";
import ExpenseOverviewChart from "../components/expenses/ExpenseOverviewChart";

const ExpensePage = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);
  const totalExpenses = useSelector((state) => state.expenses.totalExpenses);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 gap-6">
      <ExpenseOverviewChart />
      <ExpensesList
        transactions={expenses}
        onDelete={(t) => dispatch(deleteExpense(t.id))}
        onDownload={() => dispatch(downloadExpenses())}
      />
    </div>
  );
};

export default ExpensePage;
