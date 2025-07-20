import { Card, CardContent, CardTitle } from "@/components/ui/card";
import FinancialPieChart from "../../charts/FinancialPieChart";

const FinancialOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance, fill: "#4f46e5" },
    { name: "Total Income", amount: totalIncome, fill: "#16a34a" },
    { name: "Total Expenses", amount: totalExpenses, fill: "#ea580c" },
  ];

  return (
    <Card className="card">
      <div className="px-6 flex items-center justify-between">
        <CardTitle className="text-lg">Financial Overview</CardTitle>
      </div>
      <CardContent>
        <FinancialPieChart
          data={balanceData}
          label="Balance Summary"
          totalAmount={totalBalance}
        />
      </CardContent>
    </Card>
  );
};

export default FinancialOverview;
