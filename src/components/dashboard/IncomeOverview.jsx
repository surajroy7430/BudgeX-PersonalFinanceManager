import { Card, CardContent, CardTitle } from "@/components/ui/card";
import FinancialBarChart from "../../charts/FinancialBarChart";

const IncomeOverview = ({ data }) => {
  return (
    <Card className="card">
      <div className="px-6 flex items-center justify-between">
        <CardTitle className="text-lg">Last 60 Days Income</CardTitle>
      </div>
      <CardContent>
        <FinancialBarChart
          data={data}
          days={60}
        />
      </CardContent>
    </Card>
  );
};

export default IncomeOverview;
