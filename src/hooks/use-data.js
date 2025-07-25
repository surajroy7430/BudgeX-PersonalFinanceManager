import { useCallback, useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { parseDate } from "@/lib/parseDate";
import { useDispatch, useSelector } from "react-redux";
import { getIncome } from "@/features/income/incomeSlice";
import { getExpenses } from "@/features/expenses/expenseSlice";

export const useData = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const income = useSelector((state) => state.income.items) || [];
  const expenses = useSelector((state) => state.expenses.items) || [];

  const totalIncome = useSelector((state) => state.income.totalAmount) || 0;
  const totalExpenses = useSelector((state) => state.expenses.totalAmount) || 0;

  useEffect(() => {
    if (user?.uid) {
      if (!income.length) dispatch(getIncome());
      if (!expenses.length) dispatch(getExpenses());
    }
  }, [dispatch, user, income.length, expenses.length]);

  const totalBalance = useMemo(
    () => (totalIncome > totalExpenses ? totalIncome - totalExpenses : 0),
    [totalIncome, totalExpenses]
  );

  const allTransactions = useMemo(
    () =>
      [...income, ...expenses].sort(
        (a, b) => parseDate(b.date) - parseDate(a.date)
      ),
    [income, expenses]
  );

  return {
    income,
    expenses,
    totalIncome,
    totalExpenses,
    totalBalance,
    allTransactions,
  };
};
