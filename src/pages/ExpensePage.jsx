import { useData } from "@/hooks/use-data";
import FinancialTypeOverviewChart from "@/charts/FinancialTypeOverviewChart";
import TransactionList from "@/Cards/TransactionList";

const ExpensePage = () => {
  const { expenses } = useData();

  return (
    <div className="grid grid-cols-1 gap-6">
      <FinancialTypeOverviewChart transactions={expenses} type="expenses" />

      {expenses.length > 0 && (
        <TransactionList data={expenses} type="expenses" />
      )}
    </div>
  );
};

export default ExpensePage;
