import { useData } from "@/hooks/use-data";
import { BALANCE_SUMMARY } from "../constants";
import BalanceCard from "@/Cards/BalanceCard";
import FinancialOverview from "@/components/dashboard/FinancialOverview";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import IncomeOverview from "@/components/dashboard/IncomeOverview";
import IncomeTransactions from "@/components/dashboard/IncomeTransactions";
import ExpensesOverview from "@/components/dashboard/ExpensesOverview";
import ExpenseTransactions from "@/components/dashboard/ExpenseTransactions";

const HomePage = () => {
  const {
    income,
    expenses,
    totalIncome,
    totalBalance,
    totalExpenses,
    allTransactions,
  } = useData();

  return (
    <>
      <div className="grid auto-rows-min gap-4 lg:grid-cols-3 mb-2">
        {BALANCE_SUMMARY.map((balance) => (
          <BalanceCard
            key={balance.id}
            icon={balance.icon}
            label={balance.label}
            color={balance.color}
            amount={
              balance.id === "totalBalance"
                ? totalBalance
                : balance.id === "totalIncome"
                ? totalIncome
                : totalExpenses
            }
          />
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 mb-2">
        <FinancialOverview />
        {allTransactions?.length > 0 && <RecentTransactions />}
      </div>

      <div className="grid auto-rows-min gap-4 lg:grid-cols-2 space-y-2">
        {/* Income */}
        {income?.length > 0 && (
          <>
            <IncomeTransactions />
            <IncomeOverview />
          </>
        )}

        {/* Expenses */}
        {expenses.length > 0 && (
          <>
            <ExpenseTransactions />
            <ExpensesOverview />
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
