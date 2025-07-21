import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIncome } from "../features/income/incomeSlice";
import { getExpenses } from "../features/expenses/expenseSlice";
import { HandCoins, Wallet, WalletMinimal } from "lucide-react";
import { parse } from "date-fns";
import BalanceCard from "../Cards/dashboard/BalanceCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import FinancialOverview from "../components/dashboard/FinancialOverview";
import ExpenseTransactions from "../components/dashboard/ExpenseTransactions";
import IncomeTransactions from "../components/dashboard/IncomeTransactions";
import ExpensesOverview from "../components/dashboard/ExpensesOverview";
import IncomeOverview from "../components/dashboard/IncomeOverview";

const HomePage = () => {
  const dispatch = useDispatch();
  const incomeItems = useSelector((state) => state.income.items);
  const expensesItems = useSelector((state) => state.expenses.items);
  const totalIncome = useSelector((state) => state.income.totalIncome);
  const totalExpenses = useSelector((state) => state.expenses.totalExpenses);

  useEffect(() => {
    dispatch(getIncome());
    dispatch(getExpenses());
  }, [dispatch]);

  const totalBalance = totalIncome ? totalIncome - (totalExpenses || 0) : 0;

  const parseDate = (dateStr) => parse(dateStr, "dd MMM yyyy", new Date());
  const allTransactions = [...incomeItems, ...expensesItems].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date)
  );

  return (
    <>
      <div className="grid auto-rows-min gap-4 lg:grid-cols-3 mb-2">
        {/* Total Balance */}
        <BalanceCard
          icon={<Wallet />}
          label="Total Balance"
          amount={
            totalBalance.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) || 0
          }
          color="bg-indigo-600"
        />
        {/* Total Income */}
        <BalanceCard
          icon={<WalletMinimal />}
          label="Total Income"
          amount={
            totalIncome.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) || 0
          }
          color="bg-green-600"
        />
        {/* Total Expenses */}
        <BalanceCard
          icon={<HandCoins />}
          label="Total Expenses"
          amount={
            totalExpenses.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) || 0
          }
          color="bg-orange-600"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 mb-2">
        <FinancialOverview transactions={allTransactions} />
        <RecentTransactions transactions={allTransactions} />
      </div>

      <div className="grid auto-rows-min gap-4 lg:grid-cols-2 space-y-2">
        {/* Income */}
        {incomeItems?.length > 0 && (
          <>
            <IncomeTransactions transactions={incomeItems} />
            <IncomeOverview data={incomeItems} totalIncome={totalIncome} />
          </>
        )}

        {/* Expenses */}
        {expensesItems?.length > 0 && (
          <>
            <ExpenseTransactions transactions={expensesItems} />
            <ExpensesOverview data={expensesItems} />
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
