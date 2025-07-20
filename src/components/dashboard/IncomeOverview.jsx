import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import FinancialPieChart from "../../charts/FinancialPieChart";

const COLORS = ["#047857", "#ea580c", "#6d28d9", "#dc2626", "#f59e0b"];

const IncomeOverview = ({ data, totalIncome }) => {
  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="text-lg">Income Overview</CardTitle>
        <CardDescription>Total Income for Last 60 Days</CardDescription>
      </CardHeader>

      <CardContent>
        <FinancialPieChart
          data={data}
          label="Total Income"
          totalAmount={totalIncome}
          colors={COLORS}
          days={60}
        />
      </CardContent>
    </Card>
  );
};

export default IncomeOverview;
