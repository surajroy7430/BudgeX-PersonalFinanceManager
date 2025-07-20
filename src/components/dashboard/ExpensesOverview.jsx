import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import FinancialBarChart from "../../charts/FinancialBarChart";

const ExpensesOverview = ({ data }) => {
  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="text-lg">Expenses Breakdown</CardTitle>
        <CardDescription>Total expenses for Last 30 Days</CardDescription>
      </CardHeader>

      <CardContent>
        <FinancialBarChart
          data={data}
          days={30}
        />
      </CardContent>
    </Card>
  );
};

export default ExpensesOverview;
