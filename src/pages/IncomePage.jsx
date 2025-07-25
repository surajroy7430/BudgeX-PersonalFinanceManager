import { useData } from "@/hooks/use-data";
import FinancialTypeOverviewChart from "@/charts/FinancialTypeOverviewChart";
import TransactionList from "@/Cards/TransactionList";

const IncomePage = () => {
  const { income } = useData();

  return (
    <div className="grid grid-cols-1 gap-6">
      <FinancialTypeOverviewChart transactions={income} type="income" />

      {income.length > 0 && <TransactionList data={income} type="income" />}
    </div>
  );
};

export default IncomePage;
