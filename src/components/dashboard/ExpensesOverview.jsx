import { Card, CardContent, CardTitle } from "@/components/ui/card";
import FinancialBarChart from "../../charts/FinancialBarChart";

const ExpensesOverview = ({ data }) => {
  return (
    <Card className="card">
      <div className="px-6 flex items-center justify-between">
        <CardTitle className="text-lg">Last 30 Days Expenses</CardTitle>
      </div>
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
